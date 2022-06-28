import { FormikHandlers, SetFieldValueFunction, TableRecord } from "@/types"
import { SchemaLike } from "yup/lib/types"

export interface FieldProps<DBType> {
    displayName: string
    required?: boolean
    autoGenerative?: boolean
    readOnly?: boolean
    placeholder?: string
    description?: string
    invisibleInTable?: boolean
    searchable?: boolean
    validate?: {
        func: (value: any) => Promise<string | undefined>
        yup?: SchemaLike
    }
    format?: {
        beforeSave?: (value: DBType, record: Partial<TableRecord>, isUpdate?: boolean) => any
    }
}

export type FieldComponentProps<DBType, _FieldProps> = {
    value: DBType
    name: string
    label: string
    field: _FieldProps

    error?: string
    disabled?: boolean
    placeholder?: string
    handlers?: FormikHandlers

    setFieldValue?: SetFieldValueFunction
}

export type FieldComponent<DBType, _FieldProps extends FieldProps<DBType> = FieldProps<DBType>> = React.FC<FieldComponentProps<DBType, _FieldProps>>

export interface NeoField<DBType, _FieldProps extends FieldProps<DBType> = FieldProps<DBType>> {
    field: _FieldProps
    EditComponent: FieldComponent<DBType, _FieldProps>
    TableComponent?: React.FC<{
        value: DBType
    }>
    type: FieldType
    format?: {
        beforeSave?: (value: DBType, record?: Partial<TableRecord>, isUpdate?: boolean) => any
    }
}

export type FieldFunction<T, _FieldProps extends FieldProps<T> = FieldProps<T>> = (field: _FieldProps) => NeoField<T, _FieldProps>

const fieldTypes = [
    "DATE",
    "TEXT",
    "MULTIPLE_RELATION",
    "SINGLE_RELATION",
    "NUMBER",
    "CUSTOM"
] as const

export type FieldType = typeof fieldTypes[number]

export * from "./date"
export * from "./multipleRelation"
export * from "./number"
export * from "./singleRelation"
export * from "./text"