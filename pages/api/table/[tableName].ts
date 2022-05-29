import { TABLES } from "@/constants"
import { prisma } from "@/storage"
import {
    Field,
    Filter,
    HandlerError,
    Relation,
    Scheme,
    SingleRelationField,
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
                if (!field) return [key, value]
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

const actions = {
    async GET(
        props: {
            filter?: Filter[]
            sort?: {
                field: string
                order: "123" | "321"
            }[]
            amount: number
            lastId?: string
        },
        slug: {
            tableName: string
        }
    ): Promise<TableRecord[]> {
        const table = TABLES.find((table) => table.tableName === slug.tableName)

        try {
            const filter = {
                AND:
                    props.filter &&
                    props.filter.map((e) => ({
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

            const sort =
                props.sort &&
                props.sort.map((e) => ({
                    [e.field]: e.order === "123" ? "asc" : "desc",
                }))

            try {
                // prisma.category.findMany({
                //     include: {
                //         products: true,
                //     }
                // })

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

                const relationKeys = Object.entries(table.fields)
                    .filter(([key, value]) =>
                        ["relation-single", "relation-multiple"].includes(
                            table.fields[key].typeOption.type
                        )
                    )
                    .map((e) => e[0])

                const relationProcessedRecords = res.map((record) => {
                    return {
                        ...record,
                        ...Object.fromEntries(
                            Object.entries(record)
                                .filter(([key]) => relationKeys.includes(key))
                                .map(([key, value]) => {
                                    const field = table.fields[key]
                                        .typeOption as SingleRelationField

                                    const typedValue = value as unknown as
                                        | TableRecord
                                        | TableRecord[]

                                    const isMultipleRelation =
                                        typedValue instanceof Array

                                    const relatedRecords =
                                        typedValue instanceof Array
                                            ? typedValue.map(
                                                  (relatedDocument) => ({
                                                      id: relatedDocument.id,
                                                      displayName:
                                                          relatedDocument[
                                                              field
                                                                  .displayNameField
                                                          ],
                                                      color: relatedDocument.color,
                                                  })
                                              )
                                            : [
                                                  {
                                                      id: typedValue.id,
                                                      displayName:
                                                          typedValue[
                                                              field
                                                                  .displayNameField
                                                          ],
                                                      color: typedValue.color,
                                                  },
                                              ]
                                    return [
                                        key,
                                        {
                                            slug: field.target,
                                            target: relatedRecords,
                                        } as Relation,
                                    ]
                                })
                        ),
                    }
                })

                return relationProcessedRecords || []
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
        console.log(data)
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
        const result: Prisma.BatchPayload = await prisma[tableName].deleteMany({
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
        const data = await generalizeFormData(props.data, table)

        const res: TableRecord = await prisma[tableName].create({
            data,
        })

        return res
    },
}

export default endpoint(actions)
export type tableKone = typeof actions
