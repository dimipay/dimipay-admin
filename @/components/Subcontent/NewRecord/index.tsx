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
        <Vexile gap={4}>
            <RecordEditer
                scheme={props.scheme}
                onReloadRequested={props.onReloadRequested}
            />
            <Button block>
                <Important white center>
                    생성
                </Important>
            </Button>
        </Vexile>
    )
}
