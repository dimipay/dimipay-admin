import { SLUG } from "@/types"
import { tableKone } from "pages/api/table/[tableName]"
import { kone } from "./core"

const METHOD = ["GET", "PATCH", "DELETE"] as const

export const table = Object.fromEntries(
    Object.keys(SLUG).map((slug) => [
        SLUG[slug],
        Object.fromEntries(
            METHOD.map((method) => [
                method,
                kone<tableKone[typeof method]>("table/" + SLUG[slug], method),
            ])
        ),
    ])
) as Record<
    SLUG,
    {
        [key in "GET" | "PATCH" | "DELETE"]: (
            input: Parameters<tableKone[key]>[0]
        ) => ReturnType<tableKone[key]>
    }
>
