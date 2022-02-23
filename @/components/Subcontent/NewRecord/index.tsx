import { Vexile } from "@haechi/flexile"
import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { Button, InlineForm } from "@/components"
import { table } from "@/functions"
import { Scheme, TableRecord } from "@/types"
import { Important } from "@/typo"

import { PropertyEditer } from "../RecordEditer/partial"

export const NewRecord = (props: {
    scheme: Scheme
    onReloadRequested(): void
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TableRecord>({
        reValidateMode: "onChange",
        defaultValues: Object.fromEntries(
            Object.entries(props.scheme.fields)
                .filter(([_, field]) => field.additional.default !== undefined)
                .map(([name, field]) => [name, field.additional.default])
        ),
    })

    const onSubmit: SubmitHandler<TableRecord> = async (data) => {
        const res = await table[props.scheme.tableName].POST({
            data: Object.fromEntries(
                Object.entries(data)
                    .filter(([key]) => !props.scheme.fields[key].autoGenerative)
                    .map(([key, value]) => [
                        key,
                        props.scheme.fields[key].additional.type === "number"
                            ? Number(value)
                            : value,
                    ])
            ),
        })
        if (res.id) {
            toast("새 항목을 추가했어요", {
                type: "success",
            })
            props.onReloadRequested()
        }
    }

    return (
        <InlineForm onSubmit={handleSubmit(onSubmit)}>
            <Vexile gap={4}>
                {Object.entries(props.scheme.fields).map(([key]) => (
                    <PropertyEditer
                        hooker={register(key, {
                            validate: props.scheme.fields[key].validateFunc,
                            required:
                                !props.scheme.fields[key].autoGenerative &&
                                props.scheme.fields[key].required,
                        })}
                        newRegister
                        error={errors[key] as FieldError}
                        field={props.scheme.fields[key]}
                    />
                ))}
                <Button block>
                    <Important white center>
                        생성
                    </Important>
                </Button>
            </Vexile>
        </InlineForm>
    )
}
