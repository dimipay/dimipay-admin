import {
    CATEGORY_SCHEME,
    POS_DEVICE_SCHEME,
    PRODUCT_SCHEME,
    USER_SCHEME,
    DISCOUNT_POLICY,
    EVENT,
    PAYMENT_METHOD_SCHEME,
    TRANSACTION_SCHEME,
} from "./schemes"
import { ADMIN_ACCOUNT_SCHEME } from "./schemes/adminAccount"
import { SchemeGroup, Statistics, StatisticsCard } from "./types"

export const assert = (name: string, isServersideOnly: boolean = true) => {
    const content = process.env[name]
    if (!content && !isServersideOnly)
        throw new Error(`Cannot find "${name}" in environment variables`)
    return content!
}

export const JWT_SECRET = assert("JWT_SECRET")
export const REDIS_URI = assert("REDIS_URI")

export const GROUPED_TABLES: SchemeGroup[] = [
    {
        groupName: "판매",
        content: [
            USER_SCHEME,
            TRANSACTION_SCHEME,
            PRODUCT_SCHEME,
            CATEGORY_SCHEME,
            DISCOUNT_POLICY,
            EVENT,
        ],
    },
    {
        groupName: "관리",
        content: [
            POS_DEVICE_SCHEME,
            ADMIN_ACCOUNT_SCHEME,
            PAYMENT_METHOD_SCHEME,
        ],
    },
]

export const STATISTICS: {
    label: string
    items: StatisticsCard[]
}[] = [
    {
        label: "판매",
        items: [
            {
                name: "오늘 판 금액",
                id: "todaySalesTotal",
                type: "number",
            },
            {
                name: "어제 판 금액",
                id: "yesterdaySalesTotal",
                type: "number",
            },
            {
                name: "오늘의 예상 순이익",
                id: "profit",
                type: "number",
                computedField(statistics) {
                    return {
                        number: {
                            value:
                                Math.floor(
                                    ((statistics.todaySalesTotal?.number
                                        ?.value || 0) *
                                        0.3) /
                                        10
                                ) * 10,
                            suffix: "원 (예상)",
                        },
                    }
                },
            },
            {
                name: "오늘의 결제 횟수",
                id: "paymentCount",
                type: "number",
            },
        ],
    },
    {
        label: "상품",
        items: [
            {
                name: "많이 팔린 상품",
                id: "highSales3",
                type: "list",
            },

            {
                name: "재고가 적은 상품",
                id: "lowStock",
                type: "list",
            },
        ],
    },
]

export const TABLES = GROUPED_TABLES.flatMap((group) => group.content)
