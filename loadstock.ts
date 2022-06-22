import { prisma } from "./@/storage/database"
import { createClient } from "redis"
import { REDIS_HASHMAPS } from "./@/functions/redisKey";

(async () => {
    const url = process.env.REDIS_URI
    if (!url) throw new Error("REDIS_URI is not defined in env vars")

    const redis = createClient({
        url,
    })
    await redis.connect()

    console.time("STOCK_CALC")

    redis.del(REDIS_HASHMAPS.product_stock)


    const summary = await prisma.productInOutLog.groupBy({
        by: ["productSid"],
        _sum: {
            delta: true,
        },
        orderBy: {
            _sum: {
                delta: "asc",
            },
        },
    })

    for (const product of summary) {
        if (product._sum.delta === null) continue
        redis.hSet(
            REDIS_HASHMAPS.product_stock,
            product.productSid,
            product._sum.delta
        )
    }

    console.timeEnd("STOCK_CALC")
    console.log("Stock calculation has done!")

    process.exit()
})()
