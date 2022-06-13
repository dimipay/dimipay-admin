import { prisma } from "@/storage"
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
                // delta: {
                //     gt: 0,
                // },
            },
            by: ["productId"],
            _sum: {
                delta: true,
            },
            take: 3,
            orderBy: {
                _sum: {
                    delta: "desc",
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
}
