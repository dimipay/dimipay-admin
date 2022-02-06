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
    })

    const onSubmit: SubmitHandler<TableRecord> = async (data) => {
        console.log(data)
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
            toast("수정사항을 저장했어요", {
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
