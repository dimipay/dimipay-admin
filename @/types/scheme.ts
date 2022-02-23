export enum SLUG {
    user = "user",
    product = "product",
    category = "category",
    posDevice = "posDevice",
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
    default?: string
}

interface SingleRelationField {
    type: "relation-single"
    target: SLUG
    default?: string
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
    additional: (
        | MultipleSelectField
        | SingleRelationField
        | {
              type: "boolean"
              default?: boolean
          }
        | {
              type: "string" | "date"
              default?: string
              pattern?: "color"
          }
        | {
              type: "number"
              default?: number
          }
    ) & {
        suffix?: string
        prefix?: string
    }
    placeholder?: string
    required?: boolean
    validateFunc?: (
        data: DataValue
    ) => boolean | undefined | string | Promise<boolean | undefined | string>
}

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
    id: string
    createdAt: Date
    updatedAt: Date
}