import { Vexile } from "@haechi/flexile"

import { Scheme } from "@/types"
import { Button } from "@/components"
import { Important } from "@/typo"

import { RecordEditer } from "../RecordEditer"

export const NewRecord = (props: {
    scheme: Scheme
    onReloadRequested(): void
}) => {
    return (
        <RecordEditer
            scheme={props.scheme}
            onReloadRequested={props.onReloadRequested}
        />
    )
}
