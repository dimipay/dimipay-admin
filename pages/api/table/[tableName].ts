import { TABLES } from "@/constants"
import { serversideSchemes } from "@/schemes/serverside"
import { prisma } from "@/storage"
import {
    Field,
    Filter,
    HandlerError,
    Relation,
    Scheme,
    SingleRelationField,
    Sort,
    TableRecord,
} from "@/types"
import { Prisma } from "@prisma/client"
import { endpoint } from ".."

const generalizeFormData = async (
    data: Omit<TableRecord, "id">,
    scheme: Scheme
) => {
    return Object.fromEntries(
        await Promise.all(
            Object.entries(data).map(async ([key, value]) => {
                const field: Field = scheme.fields[key]
                if (!field || !value) return [key, value]
                const typedValue =
                    field.typeOption.type === "date"
                        ? new Date(value.toString())
                        : value

                if (value === "") return [key, undefined]

                return [
                    key,
                    field.saveWithComputed
                        ? await field.saveWithComputed(typedValue)
                        : typedValue,
                ]
            })
        )
    )
}

const filtersToPrismaWhereOption = (filters: Filter[]) => {
    return {
        AND: filters.map((e) => ({
            [e[0]]: {
                [{
                    "=": "equals",
                    ">": "gt",
                    ">=": "gte",
                    "<": "lt",
                    "<=": "lte",
                }[e[1]] || e[1]]: e[2],
            },
        })),
    }
}

const sortsToPrismaOrderByOption = (sorts: Sort[]) => {
    return sorts.map((e) => ({
        [e.field]: e.order === "123" ? "asc" : "desc",
    }))
}

const actions = {
    async GET(
        props: {
            filter?: Filter[]
            sort?: Sort[]
            amount: number
            lastId?: string
        },
        slug: {
            tableName: string
        }
    ): Promise<TableRecord[]> {
        const _table = TABLES.find(
            (table) => table.tableName === slug.tableName
        )

        if (!_table)
            throw new HandlerError(
                `테이블 ${slug.tableName}을 찾을 수 없습니다.`,
                404
            )

        const serversideScheme = serversideSchemes.find(
            (e) => e.tableName === _table.tableName
        )

        const table = {
            ..._table,
            ...serversideScheme,
        }

        try {
            const filter =
                props.filter && filtersToPrismaWhereOption(props.filter)
            const sort = props.sort && sortsToPrismaOrderByOption(props.sort)

            try {
                const res: TableRecord[] = await (
                    prisma[table.tableName].findMany as any
                )({
                    orderBy: sort,
                    where: filter,
                    take: props.amount || 20,
                    cursor: props.lastId && {
                        id: props.lastId,
                    },
                    select: Object.keys(table.fields).reduce(
                        (acc, current) => ({
                            ...acc,
                            [current]: true,
                        }),
                        {}
                    ),
                })

                const relationConnectedRecords: TableRecord[] = res.map(
                    (record) => ({
                        ...record,
                        ...Object.fromEntries(
                            Object.entries(record)
                                // 릴레이션 필드만 추출하기
                                .filter(
                                    ([key]) =>
                                        table.fields[
                                            key
                                        ].typeOption.type.startsWith(
                                            "relation-"
                                        ) && record[key] !== null
                                )

                                // 1:N이냐, 1:1이냐에 따라 릴레이션 필드를 올바르게 변환함
                                .map(([key, _value]) => {
                                    const field = table.fields[key]
                                        .typeOption as SingleRelationField

                                    const value = _value as unknown as
                                        | TableRecord
                                        | TableRecord[]

                                    const isMultipleRelation =
                                        value instanceof Array

                                    const relatedFields = isMultipleRelation
                                        ? value.map((relatedDocument) => ({
                                            id: relatedDocument.id,
                                            displayName:
                                                relatedDocument[
                                                field.displayNameField
                                                ],
                                            color: relatedDocument.color,
                                        }))
                                        : [
                                            {
                                                id: value.id,
                                                displayName:
                                                    value[
                                                    field.displayNameField
                                                    ],
                                                color: value.color,
                                            },
                                        ]
                                    return [
                                        key,
                                        {
                                            slug: field.target,
                                            target: relatedFields,
                                        } as Relation,
                                    ]
                                })
                        ),
                    })
                )

                if (!table.computedFields) return relationConnectedRecords || []

                const recordsIncludingComputedFields =
                    relationConnectedRecords.map(async (record) => ({
                        ...record,
                        ...Object.fromEntries(
                            await Promise.all(
                                Object.entries(table.computedFields!).map(
                                    async ([key, field]) => [
                                        key,
                                        (await field.func?.(record)) || "",
                                    ]
                                )
                            )
                        ),
                    }))

                return (await Promise.all(recordsIncludingComputedFields)) || []
            } catch (e) {
                console.log(e)
                throw e
            }
        } catch (e) {
            console.log(e)
            throw e
        }
    },
    async PATCH(
        props: {
            id: string
            data: Omit<TableRecord, "id">
        },
        slug: {
            tableName: string
        }
    ) {
        const table = TABLES.find((table) => table.tableName === slug.tableName)

        if (!table)
            throw new HandlerError(
                `요청한 테이블(${slug.tableName})을 찾을 수 없어요`,
                400
            )

        for (const key in props.data) {
            const field = table.fields[key]

            if (!field) continue

            if (field.readOnly)
                throw new HandlerError(
                    `${field.displayName.은는} 수정이 불가능해요`,
                    400
                )

            const validateResult = await table.fields[key]?.validateFunc?.(
                props.data[key]
            )

            if (typeof validateResult === "string")
                throw new HandlerError(
                    `${table.fields[key].displayName.이가} 올바르지 않아요. ` +
                    validateResult,
                    400
                )

            if (validateResult === false)
                throw new HandlerError(
                    `${table.fields[key].displayName.이가} 올바르지 않아요`,
                    400
                )
        }

        const data = await generalizeFormData(props.data, table)

        const res: TableRecord = await (prisma[table.tableName].update as any)({
            where: {
                id: props.id,
            },
            data,
        })

        if (!res.id) throw new HandlerError(`수정에 오류가 발생했어요`, 500)

        return res
    },
    async DELETE(
        props: { ids: string[] },
        {
            tableName,
        }: {
            tableName: string
        }
    ) {
        const table = TABLES.find((table) => table.tableName === tableName)
        if (!table) {
            throw new HandlerError(
                `요청한 테이블 (${tableName})을 찾을 수 없어요`,
                400
            )
        }

        const result: Prisma.BatchPayload = await (
            prisma[table.tableName] as any
        ).deleteMany({
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
            tableName,
        }: {
            tableName: string
        }
    ) {
        const table = TABLES.find((table) => table.tableName === tableName)

        if (!table)
            throw new HandlerError(
                `요청한 테이블(${tableName})을 찾을 수 없어요`,
                404
            )

        const data = await generalizeFormData(props.data, table)

        const res: TableRecord = await (prisma[table.tableName] as any).create({
            data,
        } as any)

        return res
    },
}

export default endpoint(actions)
export type tableKone = typeof actions
