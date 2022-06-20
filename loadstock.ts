import { prisma } from "./@/storage/database"
import { createClient } from "redis"
import { redisKey } from "./@/functions/redisKey"
;(async () => {
    const url = process.env.REDIS_URI
    if (!url) throw new Error("REDIS_URI is not defined in env vars")

    const client = createClient({
        url,
    })
    await client.connect()

    console.time("STOCK_CALC")

    const summary = await prisma.productInOutLog.groupBy({
        by: ["productId"],
        _sum: {
            delta: true,
        },
    })

    for (const product of summary) {
        if (product._sum.delta === null) continue
        client.set(redisKey.stock(product.productId), product._sum.delta)
    }

    console.timeEnd("STOCK_CALC")
    console.log("Stock calculation has done!")

    process.exit()
})()