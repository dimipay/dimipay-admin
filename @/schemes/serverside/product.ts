import { REDIS_HASHMAPS } from "@/functions"
import { Product } from "@prisma/client"
import { loadRedis } from "@/storage"
import { NeoScheme } from "../user"
import { SLUG } from "@/types"

export const PRODUCT_SCHEME_SERVERSIDE: Partial<NeoScheme> = {
    slug: SLUG.product,
    computedFields: {
        stock: {
            name: "재고",
            async func(record) {
                const redis = await loadRedis()

                const stock = await redis.hGet(
                    REDIS_HASHMAPS.product_stock,
                    (record as Product).systemId
                )

                return stock || "미등록"
            },
        },
    },
}
