import { Button, InlineForm } from "@/components"
import { table } from "@/functions"
import { DataValue, Scheme, TableRecord } from "@/types"
import { Important } from "@/typo"
import { Vexile } from "@haechi/flexile"
import { useEffect } from "react"
import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { PropertyEditer } from "./partial"

export const RecordEditer = (props: {
    data: TableRecord
    scheme: Scheme
    onReloadRequested(): void
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TableRecord>({
        defaultValues: props.data,
        reValidateMode: "onChange",
    })

    useEffect(() => {
        for (const key in props.data) {
            setValue(key, props.data[key])
        }
    }, [props.data])

    const onSubmit: SubmitHandler<TableRecord> = async (data) => {
        const res = await table[props.scheme.tableName].patch({
            id: props.data.id,
            data: Object.fromEntries(
                Object.entries(data).filter(
                    ([column]) =>
                        column in props.scheme.fields &&
                        props.scheme.fields[column].disabled !== true
                )
            ),
        })

        if (res.id) {
            toast("수정사항을 저장했어요", {
                type: "success",
            })
            props.onReloadRequested()
        }
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
