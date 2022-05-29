import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { Vexile } from "@haechi/flexile"
import { toast } from "react-toastify"

import { DataValue, Field, Scheme, TableRecord } from "@/types"
import { Button, InlineForm } from "@/components"
import { table } from "@/functions"
import { Important } from "@/typo"

import { PropertyEditer } from "../RecordEditer/partial"
import { prisma } from "@/storage"

const dataTyper = (field: Field, value: DataValue) => {
    if (field.typeOption.type === "number") return +value

    if (field.typeOption.type === "date")
        return new Date(value.toString()).toISOString()

    return value
}

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
                .filter(([_, field]) => field.typeOption.default !== undefined)
                .map(([name, field]) => [name, field.typeOption.default])
        ),
    })

    const onSubmit: SubmitHandler<TableRecord> = async (data) => {
        console.log(data)
        const processedData = Object.fromEntries(
            Object.entries(data)
                .filter(([key]) => !props.scheme.fields[key].autoGenerative)
                .map(([key, value]) => {
                    const field: Field = props.scheme.fields[key]

                    if (field.typeOption.type === "relation-single") {
                        return [
                            key,
                            {
                                connect: {
                                    id: value[0],
                                },
                            },
                        ]
                    }

                    if (field.typeOption.type === "relation-multiple") {
                        return [
                            key,
                            {
                                connect: {
                                    id: value,
                                },
                            },
                        ]
                    }

                    const typedValue = dataTyper(field, value)

                    // if (field.saveWithComputed) {
                    //     return [key, field.saveWithComputed(typedValue)]
                    // }

                    return [key, typedValue]
                })
        )

        const res = await table[props.scheme.tableName].POST({
            data: processedData,
        })
        if (res.id) {
            toast("새 항목을 추가했어요", {
                type: "success",
            })
            props.onReloadRequested()
            return
        }

        toast.error("새 항목을 추가하지 못했습니다")
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
