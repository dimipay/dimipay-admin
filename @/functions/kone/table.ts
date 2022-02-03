import { TABLES } from "@/constants"
import { tableKone } from "pages/api/table/[slug]"
import { kone } from "./core"

export const table = Object.fromEntries(
    TABLES.map((e) => [
        e.slug,
        {
            get: kone<tableKone["GET"]>("table/" + e.slug, "GET"),
        },
    ])
)
