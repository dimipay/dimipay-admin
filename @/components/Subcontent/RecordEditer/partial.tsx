import { Input, Dropdown } from "@/components"
import { TEXT_INPUT_COMPATIBLE_TYPES } from "@/components/Input"
import { table } from "@/functions"
import {
    DataValue,
    Field,
    Option,
    Relation,
    SingleRelationField,
} from "@/types"
import { Description, Regular } from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"
import React, { ChangeEventHandler, FocusEventHandler, useMemo } from "react"

export interface FormikHandlers {
    onChange: ChangeEventHandler<HTMLInputElement>
    onBlur: FocusEventHandler<any>
}

export type SetFieldValueFunction = (field: string, value: any) => any

const createRelationOptionRetriever =
    (field: Field) => async (keyword?: string) => {
        const option = field.typeOption as SingleRelationField

        const relationData = (
            await table[option.target].GET({
                amount: 5,
                filter: keyword
                    ? [[option.displayNameField, "contains", keyword]]
                    : undefined,
            })
        ).map((row) => ({
            label: row[option.displayNameField] as string,
            key: row.id,
            color: row.color as string,
        }))

        return relationData
    }

export const PropertyEditer: React.FC<{
    field: Field
    data?: DataValue
    error?: string
    newRegister?: boolean
    handlers: FormikHandlers
    name: string
    setFieldValue?: SetFieldValueFunction
    value?: DataValue
}> = (props) => {
    const dataType = props.field.typeOption.type

    const cachedRelationOptionRetriever = useMemo(() => {
        if (dataType.startsWith("relation")) {
            return createRelationOptionRetriever(props.field)
        }
        return undefined
    }, [dataType])

    const placeholder = props.field.autoGenerative
        ? "자동으로 설정됩니다"
        : props.field.placeholder ||
          props.field.displayName.을를 + " 입력해주세요"

    const disabled =
        (props.newRegister && props.field.autoGenerative) ||
        (!props.newRegister && props.field.readOnly)

    const commonProps = {
        name: props.name,
        label: props.field.displayName,
        error: props.error,
        disabled,
        placeholder,
        setFieldValue: props.setFieldValue,
        value: props.value,
        ...props.handlers,
    }

    if (
        (TEXT_INPUT_COMPATIBLE_TYPES as unknown as string[]).includes(dataType)
    ) {
        return (
            <Vexile gap={1}>
                <Input
                    {...commonProps}
                    value={props.value?.toString()}
                    defaultValue={props.data as string}
                    type={
                        dataType as typeof TEXT_INPUT_COMPATIBLE_TYPES[number]
                    }
                />
                {props.field.description && (
                    <Description>{props.field.description}</Description>
                )}
            </Vexile>
        )
    }

    if (dataType === "multiple") {
        return (
            <Vexile gap={1}>
                <Dropdown
                    options={props.field.typeOption.options}
                    {...commonProps}
                    value={[]}
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
                <input type="checkbox" />
                {props.field.description && (
                    <Description>{props.field.description}</Description>
                )}
            </Hexile>
        )
    }

    if (dataType === "relation-single" || dataType === "relation-multiple") {
        return (
            <Vexile gap={1}>
                <Dropdown
                    maxSelectAmount={
                        dataType === "relation-multiple" ? undefined : 1
                    }
                    {...commonProps}
                    value={(props.value as unknown as Option[]) || []}
                    optionsRetriever={cachedRelationOptionRetriever}
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
