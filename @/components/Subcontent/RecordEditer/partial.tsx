import { DateInput, Input, MultipleSelect } from "@/components"
import { useConsole } from "@/functions"
import { DataValue, Field } from "@/types"
import { Description } from "@/typo"
import { Vexile } from "@haechi/flexile"
import React from "react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"

export const PropertyEditer: React.FC<{
    field: Field
    data?: DataValue
    hooker: UseFormRegisterReturn
    error?: FieldError
    newRegister?: boolean
}> = (props) => {
    const dataType = props.field.additional.type

    const placeholder =
        props.newRegister && props.field.autoGenerative
            ? "자동으로 설정됩니다"
            : props.field.placeholder ||
              props.field.display.을를 + " 입력해주세요"

    const disabled =
        (props.newRegister && props.field.autoGenerative) ||
        (!props.newRegister && props.field.readOnly)

    useConsole("FIELD_ERROR", props.error?.message)

    if (dataType === "string" || dataType === "number") {
        return (
            <Vexile gap={1}>
                <Input
                    hooker={props.hooker}
                    name={props.field.display}
                    defaultValue={props.data as string}
                    disabled={disabled}
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

    if (dataType === "multiple")
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
                    disabled={disabled}
                />
                {props.field.description && (
                    <Description>{props.field.description}</Description>
                )}
            </Vexile>
        )

    if (dataType === "date")
        return (
            <Vexile gap={1}>
                <DateInput
                    // hooker={props.hooker}
                    name={props.field.display}
                    defaultValue={props.data as Date}
                    placeholder={placeholder}
                    error={props.error?.message}
                    disabled={disabled}
                    // type="datetime-local"
                />
                {props.field.description && (
                    <Description>{props.field.description}</Description>
                )}
            </Vexile>
        )

    console.log(dataType, "IS NOT IMPLEMENTED")

    return <></>
}
