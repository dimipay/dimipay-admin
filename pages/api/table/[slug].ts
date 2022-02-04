import { TABLES } from "@/constants"
import { prisma } from "@/storage"
import { HandlerError, Operator, TableRecord } from "@/types"
import { endpoint } from ".."

const actions = {
    async GET(
        props: {
            filter?: [string, Operator, string][]
            sort?: {
                field: string
                order: "123" | "321"
            }[]
            amount: number
            lastId?: number
        },
        slug: {
            slug: string
        }
    ): Promise<TableRecord[]> {
        const table = TABLES.find((table) => table.slug === slug.slug)

        try {
            const filter = {
                AND:
                    props.sort &&
                    props.sort.map((e) => ({
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
                return await prisma[table.tableName].findMany({
                    orderBy: sort,
                    where: filter,
                    take: props.amount || 20,
                    cursor: props.lastId && {
                        id: props.lastId,
                    },
                })
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
            id: number
            data: Omit<TableRecord, "id">
        },
        slug: {
            slug: string
        }
    ) {
        const table = TABLES.find((table) => table.slug === slug.slug)

        if (!table)
            throw new HandlerError(
                `요청한 테이블(${slug.slug})을 찾을 수 없어요`,
                400
            )
        console.log("됐대?", table.tableName, props.data, props.id)

        const res: TableRecord = await prisma[table.tableName].update({
            where: {
                id: props.id,
            },
            data: props.data,
        })

        if (!res.id) throw new HandlerError(`수정에 오류가 발생했어요`, 500)

        return res
    },
}

export default endpoint(actions)
export type tableKone = typeof actions
