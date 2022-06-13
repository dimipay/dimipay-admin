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
import { SchemeGroup } from "./types"

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

export const TABLES = GROUPED_TABLES.flatMap((group) => group.content)
