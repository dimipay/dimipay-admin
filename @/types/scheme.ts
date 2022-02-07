import { Validate } from "react-hook-form"

export enum SLUG {
    user = "dimipay_users",
    product = "product",
}

interface Relation {
    target: string
    ids: string[]
}

export type DataValue =
    | string
    | number
    | boolean
    | Date
    | null
    | undefined
    | string[]
    | number[]
    | boolean[]
    | Date[]
    | Relation

export interface Option {
    label: string
    key?: string | number
    color?: string
    amount?: number
}

interface MultipleSelectField {
    type: "multiple"
    options: Option[]
    map?: Record<string | number, string>
}

export const isMultipleSelect = (d: any): d is MultipleSelectField =>
    d.type === "multiple"

export interface Field {
    display: string
    invisibleInTable?: boolean
    description?: string
    computed?(value: unknown): string
    autoGenerative?: boolean
    readOnly?: boolean
    additional:
        | MultipleSelectField
        | {
              type: "string" | "number" | "boolean" | "date"
          }
    placeholder?: string
    required?: boolean
    validateFunc?: (
        data: DataValue
    ) => boolean | undefined | string | Promise<boolean | undefined | string>
}

type FieldType = Field['additional']['type']

export interface ToolbarAction {
    button: {
        label: string
        color: "danger" | "normal" | "accent"
    }
    func(selectedRecords: TableRecord[], scheme: Scheme): void
}

export interface Scheme {
    name: string
    tableName: SLUG
    fields?: Record<string, Field>
    actions?: ToolbarAction[]
}

export interface SchemeGroup {
    groupName: string
    content: Scheme[]
}

export type TableRecord = Record<string, DataValue> & {
    id: number
}
