import { Input, MultipleSelect } from "@/components"
import { useConsole } from "@/functions"
import { DataValue, Field } from "@/types"
import React from "react"
import { FieldError, FieldErrors, UseFormRegisterReturn } from "react-hook-form"

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

    if (dataType === "string")
        return (
            <Input
                hooker={props.hooker}
                name={props.field.display}
                defaultValue={props.data as string}
                disabled={props.field.disabled}
                placeholder={placeholder}
                error={props.error?.message}
            />
        )

    if (dataType === "number")
        return (
            <Input
                hooker={props.hooker}
                name={props.field.display}
                defaultValue={props.data as string}
                disabled={props.field.disabled}
                type="number"
                placeholder={placeholder}
                error={props.error?.message}
            />
        )

    if (
        dataType === "object" &&
        props.data instanceof Array &&
        typeof props.data[0] !== "boolean"
    ) {
        if (props.field.additional?.type === "multiple")
            return (
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
            )
    }

    console.log(dataType)

    return <></>
}
