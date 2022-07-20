import { TABLES } from "@/constants"
import {
    isMultipleRelationField,
    MultipleRelationNeoField,
    SingleRelationNeoField,
} from "@/fields"
import { prisma } from "@/storage"
import { HandlerError, NeoScheme, SLUG } from "@/types"
import { endpoint } from ".."

const formatBatchUpdate = async (
    scheme: NeoScheme,
    record: Record<string, string | number | Date | boolean>,
) => {
    const matched: Record<string, any> = {}

    await Promise.all(
        Object.entries(record).map(async ([key, value]) => {
            const field = scheme.fields[key]
            const { type } = field
            if (type === "TEXT") {
                matched[key] = value
            } else if (type === "NUMBER") {
                matched[key] = +value
            } else if (isMultipleRelationField(field)) {
                const relationField = field as MultipleRelationNeoField
                if (!relationField.field.targetTable) return

                const where = {
                    [relationField.field.nameField as string]: {
                        in: value.toString().split(","),
                    },
                }

                const queried = await (
                    prisma[
                        relationField.field.targetTable
                    ] as typeof prisma.transaction
                ).findMany({
                    where,
                    select: {
                        id: true,
                    },
                })

                matched[key] = {
                    set: queried.map(e => ({
                        id: e.id,
                    })),
                }
            } else if (type === "SINGLE_RELATION") {
                const relationField = field as SingleRelationNeoField

                const queried = await (
                    prisma[
                        relationField.field.targetTable!
                    ] as typeof prisma.transaction
                ).findFirst({
                    where: {
                        [relationField.field.nameField as string]: value,
                    },
                    select: {
                        id: true,
                    },
                })

                matched[key] = {
                    connect: {
                        id: queried?.id,
                    },
                }
            }
        }, {}),
    )

    return matched
}

const actions = {
    async PATCH(
        {
            records,
            alignField,
            header,
            match,
        }: {
            records: Record<string, string | number | Date | boolean>[]
            match: string[]
            header: string[]
            alignField: string
        },
        {
            slug,
        }: {
            slug: SLUG
        },
    ) {
        const table: NeoScheme | undefined = TABLES.find(
            table => table.slug === slug,
        )

        if (!table) {
            throw new HandlerError(
                `요청한 테이블(${slug})을 찾을 수 없어요`,
                400,
            )
        }

        const alignFieldInFile = header[match.indexOf(alignField)]

        const keys = (
            (await (prisma[slug] as typeof prisma.transaction).findMany({
                where: {
                    [alignField]: {
                        in: records.map(record => record[alignFieldInFile]),
                    },
                },
                select: {
                    [alignField]: true,
                    id: true,
                },
            })) as ({
                [key: typeof alignField]: string
            } & {
                id: number
            })[]
        ).reduce((prev, current) => {
            prev[current[alignField]] = current.id
            return prev
        }, {} as Record<string, number>)

        let affected = 0

        await Promise.all(
            records.map(async record => {
                if (!keys[record[alignFieldInFile] as string]) return

                const data = await formatBatchUpdate(
                    table,
                    match.reduce((prev, current) => {
                        const v = record[header[match.indexOf(current)]]

                        if (!v) return prev
                        prev[current] = v

                        return prev
                    }, {} as typeof record),
                )

                await (prisma[slug] as typeof prisma.transaction).update({
                    where: {
                        id: keys[record[alignFieldInFile] as string],
                    },
                    data,
                })

                affected++
            }),
        )

        return {
            affected,
        }
    },
}

export default endpoint(actions)
export type batchKone = typeof actions.PATCH
