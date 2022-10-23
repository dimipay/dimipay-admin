import {
    NEO_CATEGORY_SCHEME,
    NEO_DISCOUNT_POLICY,
    NEO_EVENT_SCHEME,
    NEO_PAYMENT_METHOD_SCHEME,
    NEO_POS_DEVICE_SCHEME,
    NEO_PRODUCT,
    NEO_PRODUCT_IN_OUT_LOG_SCHEME,
    NEO_STORE_PRODUCT,
    NEO_TRANSACTION_SCHEME,
    NEO_USER,
    NEO_ADMIN_ROLE_SCHEME,
    NEO_ADMIN_ACCOUNT,
    NEO_COUPON_SCHEME,
    NEO_NOTICE_SCHEME,
} from "./schemes"
import { NeoScheme, SchemeGroup, StatisticsCard } from "./types"

export const assert = (name: string, isServersideOnly = true) => {
    const content = process.env[name]
    if (!content && !isServersideOnly)
        throw new Error(`Cannot find "${name}" in environment variables`)
    return content!
}

export const JWT_SECRET = assert("JWT_SECRET")
export const REDIS_URI = assert("REDIS_URI")
export const NOTION_TOKEN = assert("NOTION_TOKEN")
export const NOTION_TABLE = assert("NOTION_TABLE")

export const SOFT_DELETE_FIELD_NAME = "is_deleted"

export enum EXPERIMENTAL_FLAGS {}
// wiz = "wiz"

export const GROUPED_TABLES: SchemeGroup[] = [
    {
        groupName: "판매",
        content: [
            // NEO_PRODUCT,
            NEO_TRANSACTION_SCHEME,
            // NEO_CATEGORY_SCHEME,
            NEO_DISCOUNT_POLICY,
            NEO_EVENT_SCHEME,
            // NEO_PRODUCT_IN_OUT_LOG_SCHEME,
            // NEO_STORE_PRODUCT,
        ],
    },
    {
        groupName: "관리",
        content: [
            NEO_POS_DEVICE_SCHEME,
            NEO_USER,
            NEO_ADMIN_ACCOUNT,
            NEO_PAYMENT_METHOD_SCHEME,
            NEO_ADMIN_ROLE_SCHEME,
            // NEO_COUPON_SCHEME,
            // NEO_NOTICE_SCHEME,
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
                                        10,
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
                name: "7일간 많이 팔린 상품",
                id: "highSales3RecentWeek",
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

export const TABLES: NeoScheme[] = GROUPED_TABLES.flatMap(
    group => group.content,
)
