import { Input, MultipleSelect } from "@/components"
import { DataValue, Field } from "@/types"
import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"

export const PropertyEditer: React.FC<{
    field: Field
    data: DataValue
    hooker: UseFormRegisterReturn
}> = (props) => {
    const dataType = typeof props.data
    const placeholder =
        props.field.placeholder || props.field.display.을를 + " 입력해주세요"

    if (dataType === "string")
        return (
            <Input
                hooker={props.hooker}
                name={props.field.display}
                defaultValue={props.data as string}
                disabled={props.field.readonly}
                placeholder={placeholder}
            />
        )

    if (dataType === "number")
        return (
            <Input
                hooker={props.hooker}
                name={props.field.display}
                defaultValue={props.data as string}
                disabled={props.field.readonly}
                type="number"
                placeholder={placeholder}
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
                />
            )
    }

    console.log(dataType)

    return <></>
}
