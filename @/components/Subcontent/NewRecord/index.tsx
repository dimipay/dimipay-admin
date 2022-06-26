import { RecordEditer } from "../RecordEditer"
import { NeoScheme } from "@/schemes"
import { table } from "@/functions"
import { toast } from "react-toastify"

export const NewRecord = (props: {
    scheme: NeoScheme
    onReloadRequested(): void
}) => {
    return (
        <RecordEditer
            scheme={props.scheme}
            onReloadRequested={props.onReloadRequested}
            onSubmit={async (data) => {
                const generalizedData = Object.fromEntries(
                    Object.entries(data)
                        .filter(
                            ([key, value]) =>
                                key in props.scheme.fields &&
                                !props.scheme.fields[key].field
                                    .autoGenerative &&
                                !(value === undefined || value === null)
                        )
                        .filter((e) => e[0])
                )

                const res = await table[props.scheme.slug].POST({
                    data: generalizedData,
                })

                if (res.id) {
                    toast("새 항목을 만들었어요", {
                        type: "success",
                    })
                }

                props.onReloadRequested?.()
            }}
        />
    )
}
