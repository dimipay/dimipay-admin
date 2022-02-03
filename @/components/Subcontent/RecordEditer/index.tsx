import { Input } from "@/components"
import { Scheme } from "@/types"
import { Vexile } from "@haechi/flexile"

export const RecordEditer = (props: {
    data: Record<string, unknown>
    scheme: Scheme
}) => {
    return (
        <Vexile gap={4}>
            {Object.entries(props.data)
                .filter(([column]) => column in props.scheme.fields)
                .map(([key, data]) => (
                    <Input
                        name={props.scheme.fields[key].display}
                        placeholder="asdf"
                        defaultValue={data as string}
                    />
                ))}
        </Vexile>
    )
}
