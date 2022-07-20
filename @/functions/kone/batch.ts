import { SLUG } from "@/types"
import { batchKone } from "pages/api/batch/[slug]"
import { kone } from "./core"

export const batchEdit = Object.keys(SLUG).reduce(
    (matched, slug) => {
        matched[slug as SLUG] = kone<batchKone>("batch/" + slug, "PATCH")

        return matched
    },
    {} as {
        [key in SLUG]: (
            input: Parameters<batchKone>[0]
        ) => ReturnType<batchKone>
    }
)
