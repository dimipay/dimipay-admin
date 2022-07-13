import { SOFT_DELETE_FIELD_NAME, TABLES } from "@/constants"
import { NeoField, FieldType } from "@/fields"
import {
    MultipleRelationFieldFactoryProps,
    MultipleRelationNeoField,
} from "@/fields/multipleRelation"
import { SingleRelationFieldFactoryProps } from "@/fields/singleRelation"
import { serversideSchemes } from "@/schemes/serverside"
import { prisma } from "@/storage"
import {
    DataValue,
    Filter,
    HandlerError,
    MultipleRelation,
    NeoScheme,
    SingleRelation,
    Sort,
    TableRecord,
} from "@/types"
import { endpoint } from ".."

export const applyFieldFormats = (
    data: Partial<TableRecord>,
    fields: NeoScheme["fields"],
    isUpdate = false,
) =>
    Object.entries(fields).reduce((acc, [key, field]) => {
        let value: DataValue = data[key]

        if (!(key in fields) && !field.field.autoGenerative) return acc
        if (!field) return acc

        if (field.format?.beforeSave && value)
            value = field.format.beforeSave(value, data, isUpdate)

        // value is empty, but it's auto generative, and generation function is available
        if (field.format?.beforeSave && !value && field.field.autoGenerative)
            value = field.format.beforeSave(value, data, isUpdate)

        if (field.field.format?.beforeSave && value)
            value = field.field.format.beforeSave(value, data, isUpdate)

        // value is empty, but it's auto generative, and generation function is available
        if (
            field.field.format?.beforeSave &&
            !value &&
            field.field.autoGenerative
        )
            value = field.field.format.beforeSave(value, data, isUpdate)

        return {
            ...acc,
            [key]: value,
        }
    }, {})

const createFieldQuery = (filter: Filter, field: NeoField<any>) => {
    const [fieldName, operator, value] = filter

    const operation = {
        [{
            "=": "equals",
            ">": "gt",
            ">=": "gte",
            "<": "lt",
            "<=": "lte",
        }[operator] || operator]: value,
    }

    if (field.type === "MULTIPLE_RELATION") {
        const nameField = (field as MultipleRelationNeoField).field.nameField
        if (!nameField) return null

        return {
            [fieldName]: {
                every: {
                    [nameField]: operation,
                },
            },
        }
    }

    if (field.type === "SINGLE_RELATION") {
        const nameField = (field as MultipleRelationNeoField).field.nameField
        if (!nameField) return null

        return {
            [fieldName]: {
                is: {
                    [nameField]: operation,
                },
            },
        }
    }

    return {
        [fieldName]: operation,
    }
}

const filtersToPrismaWhereOption = (
    filters: Filter[],
    searchQuery: string | null,
    fields: NeoScheme["fields"],
) => {
    return {
        AND: [
            ...filters
                .map(filter => createFieldQuery(filter, fields[filter[0]]))
                .filter(e => e !== null),
            searchQuery && {
                OR: Object.entries(fields)
                    .filter(([key, value]) => value.field.searchable)
                    .map(([fieldName, field]) =>
                        createFieldQuery(
                            [fieldName, "contains", searchQuery],
                            field,
                        ),
                    ),
            },
        ],
    }
}

const sortsToPrismaOrderByOption = (sorts: Sort[]) => {
    return sorts.map(e => ({
        [e.field]: e.order === "123" ? "asc" : "desc",
    }))
}

const actions = {
    async GET(
        props: {
            filter?: Filter[]
            sort?: Sort[]
            amount: number
            skip?: number
            searchQuery?: string
            only?: {
                fieldName: string
                values: (string | number | Date | boolean)[]
            }
        },
        slug: {
            slug: string
        },
    ): Promise<{
        records: TableRecord[]
        amount: number
    }> {
        const _table = TABLES.find(table => table.slug === slug.slug)

        if (!_table)
            throw new HandlerError(
                `테이블 ${slug.slug}을 찾을 수 없습니다.`,
                404,
            )

        const serversideScheme = serversideSchemes.find(
            e => e.slug === _table.slug,
        )

        const table: NeoScheme = {
            ..._table,
            ...serversideScheme,
        }

        const filter =
            props.filter &&
            filtersToPrismaWhereOption(
                props.filter,
                props.searchQuery || null,
                table.fields,
            )
        const sort = props.sort && sortsToPrismaOrderByOption(props.sort)

        const res: TableRecord[] = await (prisma[table.slug].findMany as any)({
            orderBy: sort,
            where: {
                ...filter,
                ...(table.softDelete && {
                    [SOFT_DELETE_FIELD_NAME]: false,
                }),
                ...(props.only && {
                    [props.only.fieldName]: {
                        in: props.only.values,
                    },
                }),
            },
            take: props.amount || 15,
            skip: props.skip || 0,
            select: Object.keys(table.fields).reduce(
                (acc, current) => ({
                    ...acc,
                    [current]: true,
                }),
                {},
            ),
        })

        const fullAmount: number = await (prisma[table.slug].count as any)({
            orderBy: sort,
            where: {
                ...filter,
                ...(table.softDelete && {
                    [SOFT_DELETE_FIELD_NAME]: false,
                }),
            },
        })

        const relationConnectedRecords: TableRecord[] = res.map(record => ({
            ...record,
            ...Object.fromEntries(
                Object.entries(record)
                    // 릴레이션 필드만 추출하기
                    .filter(
                        ([key, value]) =>
                            (
                                [
                                    "SINGLE_RELATION",
                                    "MULTIPLE_RELATION",
                                ] as FieldType[]
                            ).includes(table.fields[key].type) &&
                            value !== null,
                    )

                    // 1:N이냐, 1:1이냐에 따라 릴레이션 필드를 올바르게 변환함
                    .map(([key, _value]) => {
                        const field = table.fields[key] as
                            | NeoField<
                                  SingleRelation,
                                  SingleRelationFieldFactoryProps
                              >
                            | NeoField<
                                  MultipleRelation,
                                  MultipleRelationFieldFactoryProps
                              >

                        const value = _value as unknown as
                            | TableRecord
                            | TableRecord[]

                        const isMultipleRelation = value instanceof Array

                        const relatedFields = isMultipleRelation
                            ? value.map(relatedDocument => ({
                                  id: relatedDocument.id,
                                  displayName:
                                      field.field.nameField &&
                                      relatedDocument[field.field.nameField],
                                  color: relatedDocument.color,
                              }))
                            : {
                                  id: value.id,
                                  displayName:
                                      field.field.nameField &&
                                      value[field.field.nameField],
                                  color: value.color,
                              }

                        return [
                            key,
                            {
                                slug: field.field.targetTable!,
                                target: relatedFields,
                            } as MultipleRelation | SingleRelation,
                        ]
                    }),
            ),
        }))

        if (!table.computedFields)
            return {
                records: relationConnectedRecords || [],
                amount: fullAmount,
            }

        const recordsIncludingComputedFields = relationConnectedRecords.map(
            async record => ({
                ...record,
                ...Object.fromEntries(
                    await Promise.all(
                        Object.entries(table.computedFields!).map(
                            async ([key, field]) => [
                                key,
                                (await field.func?.(record)) || "",
                            ],
                        ),
                    ),
                ),
            }),
        )

        return {
            records: (await Promise.all(recordsIncludingComputedFields)) || [],
            amount: fullAmount,
        }
    },
    async PATCH(
        props: {
            id: number
            data: Omit<TableRecord, "id">
        },
        slug: {
            slug: string
        },
    ) {
        const table = TABLES.find(table => table.slug === slug.slug)

        if (!table) {
            throw new HandlerError(
                `요청한 테이블(${slug.slug})을 찾을 수 없어요`,
                400,
            )
        }

        for (const key in props.data) {
            const field = table.fields[key]

            if (!field) continue

            if (field.field.readOnly)
                throw new HandlerError(
                    `${field.field.displayName.은는} 수정이 불가능해요`,
                    400,
                )

            const validateResult = await table.fields[
                key
            ]?.field.validate?.func?.(props.data[key])

            if (typeof validateResult === "string")
                throw new HandlerError(
                    `${table.fields[key].field.displayName.이가} 올바르지 않아요. ` +
                        validateResult,
                    400,
                )

            if (validateResult === false)
                throw new HandlerError(
                    `${table.fields[key].field.displayName.이가} 올바르지 않아요`,
                    400,
                )

            if (field.field.validate?.yup) {
                try {
                    await field.field.validate.yup.validate(props.data[key])
                } catch (e) {
                    throw new HandlerError(
                        `${table.fields[key].field.displayName.이가} 올바르지 않아요. ` +
                            (e as Error).message,
                        400,
                    )
                }
            }
        }

        const data = applyFieldFormats(props.data, table.fields, true)

        const res: TableRecord = await (prisma[table.slug].update as any)({
            where: {
                id: props.id,
            },
            data,
        })

        if (!res.id) throw new HandlerError(`수정에 오류가 발생했어요`, 500)

        return res
    },
    async DELETE(
        props: { ids: number[] },
        {
            slug,
        }: {
            slug: string
        },
    ) {
        const table = TABLES.find(table => table.slug === slug)
        if (!table) {
            throw new HandlerError(
                `요청한 테이블 (${slug})을 찾을 수 없어요`,
                400,
            )
        }

        if (table.softDelete) {
            await (prisma[table.slug] as any).updateMany({
                where: {
                    id: {
                        in: props.ids,
                    },
                },
                data: {
                    [SOFT_DELETE_FIELD_NAME]: true,
                },
            })

            return {
                ok: true,
            }
        }

        await (prisma[table.slug] as any).deleteMany({
            where: {
                id: {
                    in: props.ids,
                },
            },
        })

        return {
            ok: true,
        }
    },
    async POST(
        props: {
            data: Omit<TableRecord, "id">
        },
        {
            slug,
        }: {
            slug: string
        },
    ) {
        const table = TABLES.find(table => table.slug === slug)

        if (!table)
            throw new HandlerError(
                `요청한 테이블(${slug})을 찾을 수 없어요`,
                404,
            )

        const data = applyFieldFormats(props.data, table.fields, false)

        const res: TableRecord = await (prisma[table.slug] as any).create({
            data,
        } as any)

        return res
    },
}

export default endpoint(actions)
export type tableKone = typeof actions
