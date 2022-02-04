import { Button, InlineForm, Input } from "@/components"
import { Scheme } from "@/types"
import { Important } from "@/typo"
import { Vexile } from "@haechi/flexile"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export const RecordEditer = (props: {
    data: Record<string, unknown>
    scheme: Scheme
}) => {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: props.data,
    })

    useEffect(() => {
        for (const key in props.data) {
            setValue(key, props.data[key])
        }
    }, [props.data])

    const onSubmit: SubmitHandler<Record<string, unknown>> = async (data) => {
        console.log(data)
    }

    return (
        <InlineForm onSubmit={handleSubmit(onSubmit)}>
            <Vexile gap={4}>
                {Object.entries(props.data)
                    .filter(([column]) => column in props.scheme.fields)
                    .map(([key, data]) => (
                        <Input
                            hooker={register(key)}
                            name={props.scheme.fields[key].display}
                            placeholder="asdf"
                            defaultValue={data as string}
                        />
                    ))}
                <Button block>
                    <Important white center>
                        저장
                    </Important>
                </Button>
            </Vexile>
        </InlineForm>
    )
}
