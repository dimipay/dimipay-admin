import { prisma } from "@/storage"
import { Session, Store } from "@/types"
import { ProductInOutType } from "@prisma/client"
import { endpoint } from "."

const actions = {
    async POST({
        stores,
        title
    }: {
        title: string;
        stores: Store[]
    }, _: unknown, user?: Session) {
        const barcodes = stores.map(e => e.barcode)

        const products = await prisma.product.findMany({
            where: {
                barcode: {
                    in: barcodes
                }
            },
            select: {
                systemId: true,
                barcode: true,
            }
        })

        const barcodeSidMap: Record<string, string> = {}

        for(const product of products) {
            barcodeSidMap[product.barcode] = product.systemId
        }

        await prisma.storeProducts.create({
            data: {
                ProductInOutLog: {
                    createMany: {
                        data: stores.map((store) => ({
                            delta: store.amount,
                            productSid: barcodeSidMap[store.barcode],
                            type: ProductInOutType.INCOME,
                            unitCost: store.unitCost,
                            
                        }))
                    }
                },
                AdminAccount: {
                    connect: {
                        id: user?.id
                    }
                },
                title,
                totalCost: stores.reduce((acc, cur) => acc + cur.unitCost * cur.amount, 0),
            }
        })

        return {
            message: "success",
        }
    }
}

export default endpoint(actions)
export type storeKone = typeof actions.POST
