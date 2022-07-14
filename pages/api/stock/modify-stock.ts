import { REDIS_HASHMAPS } from "@/functions"
import { loadRedis, prisma } from "@/storage"
import { HandlerError } from "@/types"
import { endpoint } from ".."

const actions = {
    POST: async (content: {
        delta: number
        message: string
        productId: number
    }) => {
        const product = await prisma.product.findFirst({
            where: {
                id: content.productId,
            },
            select: {
                purchaseCost: true,
                systemId: true,
            },
        })

        if (!product) {
            throw new HandlerError("존재하지 않는 상품입니다", 400)
        }

        const result = await prisma.productInOutLog.create({
            data: {
                delta: content.delta,
                type: content.delta > 0 ? "INCOME" : "OUTCOME",
                message: content.message,
                productSid: product.systemId,
                unitCost: product.purchaseCost,
            },
        })

        const redis = await loadRedis()

        redis.hIncrBy(
            REDIS_HASHMAPS.product_stock,
            product.systemId,
            content.delta,
        )

        return result
    },
}

export default endpoint(actions)
export type modifyStockKone = typeof actions
