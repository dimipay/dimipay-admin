import { redisKey } from "@/functions"
import { loadRedis } from "@/storage"
import { Scheme, SLUG } from "@/types"

export const PRODUCT_SCHEME_SERVERSIDE: Partial<Scheme> = {
    tableName: SLUG.product,
    computedFields: {
        stock: {
            displayName: "재고",
            async func(record) {
                const redis = await loadRedis()
                const stock = await redis.get(redisKey.stock(record.id))
                console.log(stock)
                return stock || "미등록"
            },
        },
    },
}
