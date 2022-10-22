import { REDIS_URI } from "@/constants"
import { createClient } from "redis"

let redisIntance: ReturnType<typeof createClient>

export async function loadRedis() {
    if (redisIntance) return redisIntance

    const client = createClient({
        url: REDIS_URI,
    })
    await client.connect()
    client.on('error', (err) => {
        console.error('Redis error:', err);
    });

    redisIntance = client
    return redisIntance
}

export const key = {
    posRegistrationPasscode: "reg_pos",
}
