export const assert = (
    name: string,
    content: string,
    isServersideOnly: boolean
) => {
    if (!content && !isServersideOnly)
        throw new Error(`Cannot find "${name}" in environment variables`)
    return content
}

export const JWT_SECRET = assert("JWT_SECRET", process.env.JWT_SECRET, true)

export const GROUPED_TABLES = [
    {
        groupName: "판매",
        content: [
            {
                name: "상품",
                tableName: "dimipay_admin_product",
                slug: "product",
            },
            {
                name: "사용자",
                tableName: "dimipay_users",
                slug: "user",
            },
        ],
    },
    {
        groupName: "관리",
        content: [
            {
                name: "상품",
                tableName: "dimipay_admin_product",
                slug: "product",
            },
            {
                name: "사용자",
                tableName: "dimipay_users",
                slug: "user",
            },
        ],
    },
]

export const TABLES = GROUPED_TABLES.map((group) => group.content).flat()
