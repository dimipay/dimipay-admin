import {
    CATEGORY_SCHEME,
    POS_DEVICE_SCHEME,
    PRODUCT_SCHEME,
    USER_SCHEME,
} from "./schemes"
import { SchemeGroup } from "./types"

export const assert = (name: string, isServersideOnly: boolean = true) => {
    const content = process.env[name]
    if (!content && !isServersideOnly)
        throw new Error(`Cannot find "${name}" in environment variables`)
    return content
}

export const JWT_SECRET = assert("JWT_SECRET")
export const REDIS_URI = assert("REDIS_URI")

export const GROUPED_TABLES: SchemeGroup[] = [
    {
        groupName: "판매",
        content: [USER_SCHEME, PRODUCT_SCHEME, CATEGORY_SCHEME],
    },
    {
        groupName: "관리",
        content: [POS_DEVICE_SCHEME],
    },
]

export const TABLES = GROUPED_TABLES.map((group) => group.content).flat()
