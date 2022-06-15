import { redisKey } from "@/functions"
import { loadRedis, prisma } from "@/storage"
import { Statistics } from "@/types"
import { ProductInOutType } from "@prisma/client"

export const statisticsGetters: {
    [key: string]: () => Promise<Statistics | null>
} = {
    async todaySalesTotal() {
        const result = await prisma.transaction.aggregate({
            where: {
                AND: [
                    {
                        createdAt: {
                            gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        },
                    },
                    {
                        createdAt: {
                            lte: new Date(new Date().setHours(23, 59, 59, 999)),
                        },
                    },
                ],
            },
            _sum: {
                totalPrice: true,
            },
        })

        if (!result._sum.totalPrice) return null

        return {
            number: {
                value: result._sum.totalPrice,
                suffix: "원",
            },
        }
    },
    async highSales3() {
        const sales = await prisma.productInOutLog.groupBy({
            where: {
                type: ProductInOutType.OUTCOME,
            },
            by: ["productId"],
            _sum: {
                delta: true,
            },
            take: 3,
            orderBy: {
                _sum: {
                    delta: "asc",
                },
            },
        })

        const sortedSales = sales
            .sort((a, b) => b._sum.delta! - a._sum.delta!)
            .slice(0, 3)

        const products = Object.fromEntries(
            (
                await prisma.product.findMany({
                    where: {
                        id: {
                            in: sortedSales.map((s) => s.productId),
                        },
                    },
                    select: {
                        id: true,
                        name: true,
                    },
                })
            ).map((product) => [product.id, product.name])
        )

        return {
            list: sortedSales.map((product) => ({
                label: products[product.productId.toString()],
                secondaryLabel: (-product._sum.delta!).toString() + "개",
            })),
        }
    },
    async yesterdaySalesTotal() {
        const result = await prisma.transaction.aggregate({
            where: {
                AND: [
                    {
                        createdAt: {
                            gte: new Date(
                                new Date().setHours(0, 0, 0, 0) -
                                    24 * 60 * 60 * 1000
                            ),
                        },
                    },
                    {
                        createdAt: {
                            lte: new Date(
                                new Date().setHours(23, 59, 59, 999) -
                                    24 * 60 * 60 * 1000
                            ),
                        },
                    },
                ],
            },
            _sum: {
                totalPrice: true,
            },
        })

        if (result._sum.totalPrice)
            return {
                number: {
                    value: result._sum.totalPrice,
                    suffix: "원",
                },
            }

        return null
    },
    async profit() {
        return {
            number: {
                value: 0,
                suffix: "원",
            },
        }
    },
    async paymentCount() {
        const res = await prisma.transaction.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                },
            },
        })

        return {
            number: {
                value: res,
                suffix: "건",
            },
        }
    },
    async lowStock() {
        const redis = await loadRedis()
        const keys = await redis.keys(redisKey.stock("*"))

        const stocks = (await redis.mGet(keys))
            .map((e, index) => ({
                id: +keys[index].split(":")[1],
                stock: e ? +e : 0,
            }))
            .sort((a, b) => a.stock - b.stock)
            .slice(0, 3)

        const producs = await prisma.product.findMany({
            where: {
                id: {
                    in: stocks.map((s) => s.id),
                },
            },
            select: {
                name: true,
                id: true,
            },
        })

        return {
            list: stocks.map((e) => ({
                label:
                    producs.find((p) => p.id === e.id)?.name ||
                    "알 수 없는 상품" + e.id,
                secondaryLabel: e.stock.toString() + "개",
            })),
        }
    },
}
