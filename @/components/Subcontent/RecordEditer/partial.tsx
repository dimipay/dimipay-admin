import { Input, MultipleSelect } from "@/components"
import { useConsole } from "@/functions"
import { DataValue, Field } from "@/types"
import { Description } from "@/typo"
import { Vexile } from "@haechi/flexile"
import React from "react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"

export const PropertyEditer: React.FC<{
    field: Field
    data: DataValue
    hooker: UseFormRegisterReturn
    error?: FieldError
}> = (props) => {
    const dataType = typeof props.data
    const placeholder =
        props.field.placeholder || props.field.display.을를 + " 입력해주세요"

    useConsole("FIELD_ERROR", props.error?.message)

    if (dataType === "string" || dataType === "number") {
        return (
            <Vexile gap={1}>
                <Input
                    hooker={props.hooker}
                    name={props.field.display}
                    defaultValue={props.data as string}
                    disabled={props.field.disabled}
                    placeholder={placeholder}
                    error={props.error?.message}
                    type={dataType === "number" ? "number" : undefined}
                />
                {props.field.description && (
                    <Description>{props.field.description}</Description>
                )}
            </Vexile>
        )
    }

    if (
        dataType === "object" &&
        props.data instanceof Array &&
        typeof props.data[0] !== "boolean"
    ) {
        if (props.field.additional?.type === "multiple")
            return (
                <Vexile gap={1}>
                    <MultipleSelect
                        options={props.field.additional.options}
                        data={props.data as string[] | number[]}
                        placeholder={
                            props.field.placeholder ||
                            props.field.display.을를 + " 선택해주세요"
                        }
                        name={props.field.display}
                        displayMap={props.field.additional.map}
                        hooker={props.hooker}
                        error={props.error?.message}
                    />
                    {props.field.description && (
                        <Description>{props.field.description}</Description>
                    )}
                </Vexile>
            )
    }

    console.log(dataType, "IS NOT IMPLEMENTED")

    return <></>
}
