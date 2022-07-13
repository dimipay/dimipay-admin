import { TABLES } from "@/constants"
import { isMultipleRelationField, isNeoField } from "@/fields"
import { prisma } from "@/storage"
import { DataValue, HandlerError, NeoScheme, SLUG, TableRecord } from "@/types"
import { endpoint, Handlers } from ".."
import { applyFieldFormats } from "../table/[slug]"

const actions: Handlers = {
    PATCH(
        {
            records,
        }: {
            records: (Record<string, DataValue> & {
                id: number
            })[]
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

        for (const record of records) {
            const data: Record<string, DataValue> = applyFieldFormats(
                record,
                table.fields,
                true,
            )

            const relationConnectedBatchData = Object.entries(data).reduce(
                async (_acc, [key, value]) => {
                    const acc = await _acc
                    if (!(key in table.fields)) return acc

                    const field = table.fields[key]

                    if (isNeoField(field) && isMultipleRelationField(field)) {
                        // prisma[field.field.tar]
                        return {
                            ...acc,
                        }
                    }

                    return {
                        ...acc,
                        [key]: value,
                    }
                },
                Promise.resolve<Record<string, DataValue>>({}),
            )

            ;(prisma[slug].update as typeof prisma.category.update)({
                where: {
                    id: record.id,
                },
                data: record,
            })
        }
    },
}

export default endpoint(actions)
export type batchKone = typeof actions
