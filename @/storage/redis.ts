import { REDIS_URI } from "@/constants"
import { createClient } from "redis"

let redisIntance: ReturnType<typeof createClient>

export async function loadRedis() {
    if (redisIntance) return redisIntance

    const client = createClient({
        url: REDIS_URI,
    })
    await client.connect()

    redisIntance = client

    return redisIntance
}

export const key = {
    posRegistrationCode: (posId: string) => `pos_reg:${posId}`,
}
