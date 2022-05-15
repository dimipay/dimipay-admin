import { DateInput, Input, Dropdown } from "@/components"
import { TEXT_INPUT_COMPATIBLE_TYPES } from "@/components/Input"
import { table, useConsole } from "@/functions"
import { DataValue, Field, Relation, SingleRelationField } from "@/types"
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

    if (dataType === "multiple") {
        // console.log(, props.data)
        return (
            <Vexile gap={1}>
                <Dropdown
                    options={props.field.typeOption.options}
                    data={[]}
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
    }

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
                    data={(props.data as Relation | undefined)?.target.map(
                        (e) => ({
                            key: e.id,
                            label: e.displayName,
                        })
                    )}
                    optionsRetriever={async (keyword) => {
                        const option = props.field
                            .typeOption as SingleRelationField

                        const relationData = (
                            await table[option.target].GET({
                                amount: 5,
                                filter: keyword && [
                                    [
                                        option.displayNameField,
                                        "contains",
                                        keyword,
                                    ],
                                ],
                            })
                        ).map((row) => ({
                            label: row[option.displayNameField] as string,
                            key: row.id as string,
                            color: row.color as string,
                        }))

                        return relationData
                    }}
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
