import { CATEGORY_SCHEME, PRODUCT_SCHEME, USER_SCHEME } from "./schemes"
import { SchemeGroup, SLUG } from "./types"

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

export const GROUPED_TABLES: SchemeGroup[] = [
    {
        groupName: "판매",
        content: [USER_SCHEME, PRODUCT_SCHEME, CATEGORY_SCHEME],
    },
    {
        groupName: "관리",
        content: [],
    },
]

export const TABLES = GROUPED_TABLES.map((group) => group.content).flat()
