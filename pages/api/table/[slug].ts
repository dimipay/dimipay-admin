import { TABLES } from "@/constants"
import { prisma } from "@/storage"
import { Operator } from "@/types"
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
    ): Promise<unknown[]> {
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
}

export default endpoint(actions)
export type tableKone = typeof actions
