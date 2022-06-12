export const redisKey = {
    stock: (product: string | number) => `product_stock:${product}`,
}
