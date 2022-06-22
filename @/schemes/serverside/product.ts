import { REDIS_HASHMAPS } from "@/functions"
import { loadRedis } from "@/storage"
import { Scheme, SLUG } from "@/types"
import { Product } from "@prisma/client"

export const PRODUCT_SCHEME_SERVERSIDE: Partial<Scheme> = {
    tableName: SLUG.product,
    computedFields: {
        stock: {
            displayName: "재고",
            async func(record: Product) {
                const redis = await loadRedis()

                const stock = await redis.hGet(
                    REDIS_HASHMAPS.product_stock,
                    record.systemId
                )

                return stock || "미등록"
            },
        },
    },
}
