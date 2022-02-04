import { Button, InlineForm } from "@/components"
import { DataValue, Scheme } from "@/types"
import { Important } from "@/typo"
import { Vexile } from "@haechi/flexile"
import { useEffect } from "react"
import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { PropertyEditer } from "./partial"

export const RecordEditer = (props: {
    data: Record<string, DataValue>
    scheme: Scheme
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Record<string, DataValue>>({
        defaultValues: props.data,
    })

    useEffect(() => {
        for (const key in props.data) {
            setValue(key, props.data[key])
        }
    }, [props.data])

    const onSubmit: SubmitHandler<Record<string, unknown>> = async (data) => {
        alert("이제해야죠")
    }

    return (
        <InlineForm onSubmit={handleSubmit(onSubmit)}>
            <Vexile gap={4}>
                {Object.entries(props.data)
                    .filter(([column]) => column in props.scheme.fields)
                    .map(([key, data]) => (
                        <PropertyEditer
                            hooker={register(key, {
                                validate: props.scheme.fields[key].validateFunc,
                            })}
                            error={errors[key] as FieldError}
                            data={data}
                            field={props.scheme.fields[key]}
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
