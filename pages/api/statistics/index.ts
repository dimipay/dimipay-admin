import { STATISTICS } from "@/constants"
import { statisticsGetters } from "@/schemes/serverside"
import { Statistics } from "@/types"
import { endpoint } from ".."

const actions = {
    GET: async (): Promise<{
        [key: string]: Statistics | null
    }> => {
        const statistics = await Promise.all(
            STATISTICS.flatMap((e) => e.items).map(async (e) => [
                e.id,
                await statisticsGetters[e.id]?.(),
            ])
        )

        return Object.fromEntries(statistics)
    },
}

export default endpoint(actions)
export type statisticsKone = typeof actions
