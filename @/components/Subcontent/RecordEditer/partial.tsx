import { NeoField } from "@/fields"
import { DataValue, FormikHandlers, SetFieldValueFunction } from "@/types"
import React from "react"

export const PropertyEditer: React.FC<{
    field: NeoField<any>
    data?: DataValue
    error?: string
    newRegister?: boolean
    handlers: FormikHandlers
    name: string
    setFieldValue?: SetFieldValueFunction
    value?: DataValue
}> = props => {
    return (
        <props.field.EditComponent
            field={props.field.field}
            value={props.value}
            label={props.field.field.displayName}
            error={props.error}
            placeholder={props.field.field.placeholder}
            handlers={props.handlers}
            name={props.name}
        />
    )

    return <></>
}
