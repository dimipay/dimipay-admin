import { REDIS_HASHMAPS } from "@/functions"
import { loadRedis, prisma } from "@/storage"
import { Statistics } from "@/types"
import { ProductInOutType } from "@prisma/client"

export async function saveProductStocksToRedis() {
    const redis = await loadRedis()

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
            product._sum.delta.toString(),
        )
    }

    return summary
}

export const statisticsGetters: {
    [key: string]: () => Promise<Statistics | null>
} = {
    async todaySalesTotal() {
        const result = await prisma.transaction.aggregate({
            where: {
                createdAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                },
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
    async highSales3RecentWeek() {
        // 현재 시간으로 부터 7일 전의 시간
        const sales = await prisma.productInOutLog.groupBy({
            where: {
                type: ProductInOutType.OUTCOME,
                createdAt: {
                    gte: new Date(+new Date() - 7 * 24 * 60 * 60 * 1000),
                },
            },
            by: ["productSid"],
            _sum: {
                delta: true,
            },
            orderBy: {
                _sum: {
                    delta: "asc",
                },
            },
            take: 5,
        })

        const products = Object.fromEntries(
            (
                await prisma.product.findMany({
                    where: {
                        systemId: {
                            in: sales.map(s => s.productSid),
                        },
                    },
                    select: {
                        systemId: true,
                        name: true,
                    },
                })
            ).map(product => [product.systemId, product.name]),
        )

        return {
            list: [
                ...sales.map(product => ({
                    label: products[product.productSid.toString()],
                    secondaryLabel: (-product._sum.delta!).toString() + "개",
                })),
            ],
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
                                    24 * 60 * 60 * 1000,
                            ),
                        },
                    },
                    {
                        createdAt: {
                            lte: new Date(
                                new Date().setHours(23, 59, 59, 999) -
                                    24 * 60 * 60 * 1000,
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
        const summary = [...(await saveProductStocksToRedis())]
            .reverse()
            .slice(0, 5)

        const products = Object.fromEntries(
            (
                await prisma.product.findMany({
                    where: {
                        systemId: {
                            in: summary.map(s => s.productSid),
                        },
                    },
                    select: {
                        systemId: true,
                        name: true,
                    },
                })
            ).map(product => [product.systemId, product.name]),
        )

        return {
            list: summary.map(product => ({
                label: products[product.productSid.toString()],
                secondaryLabel: product._sum.delta!.toString() + "개",
            })),
        }
    },
}
