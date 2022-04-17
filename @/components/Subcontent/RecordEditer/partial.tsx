import { DateInput, Input, Dropdown } from "@/components"
import { TEXT_INPUT_COMPATIBLE_TYPES } from "@/components/Input"
import { useConsole } from "@/functions"
import { DataValue, Field } from "@/types"
import { Description, Regular, Token } from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"
import React from "react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"

export const PropertyEditer: React.FC<{
    field: Field
    data?: DataValue
    hooker: UseFormRegisterReturn
    error?: FieldError
    newRegister?: boolean
}> = (props) => {
    const dataType = props.field.typeOption.type

    const placeholder =
        props.newRegister && props.field.autoGenerative
            ? "자동으로 설정됩니다"
            : props.field.placeholder ||
              props.field.displayName.을를 + " 입력해주세요"

    const disabled =
        (props.newRegister && props.field.autoGenerative) ||
        (!props.newRegister && props.field.readOnly)

    useConsole("FIELD_ERROR", props.error?.message)

    const commonProps = {
        hooker: props.hooker,
        name: props.field.displayName,
        error: props.error?.message,
        disabled,
        placeholder,
    }

    if (TEXT_INPUT_COMPATIBLE_TYPES.includes(dataType)) {
        return (
            <Vexile gap={1}>
                <Input
                    {...commonProps}
                    defaultValue={props.data as string}
                    type={dataType}
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
                <Dropdown
                    options={props.field.typeOption.options}
                    data={props.data as string[] | number[]}
                    {...commonProps}
                    placeholder={
                        props.field.placeholder ||
                        props.field.displayName.을를 + " 선택해주세요"
                    }
                    displayMap={props.field.typeOption.map}
                />
                {props.field.description && (
                    <Description>{props.field.description}</Description>
                )}
            </Vexile>
        )

    if (dataType === "boolean") {
        return (
            <Hexile gap={2} x="space">
                <Regular>{props.field.displayName}</Regular>
                <input type="checkbox" {...props.hooker} />
                {props.field.description && (
                    <Description>{props.field.description}</Description>
                )}
            </Hexile>
        )
    }

    if (dataType === "relation-single") {
        return (
            <Vexile gap={1}>
                <Dropdown
                    options={[
                        {
                            label: "집",
                            amount: 10,
                            color: "red",
                        },
                    ]}
                    {...commonProps}
                    placeholder={props.field.displayName.을를 + " 선택해주세요"}
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
