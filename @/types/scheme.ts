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

export interface Field {
    display: string
    description?: string
    computed?(value: unknown): string
    disabled?: boolean
    additional?: {
        type: "multiple"
        options: Option[]
        map?: Record<string | number, string>
    }
    placeholder?: string
    required?: boolean
    validateFunc?: (
        data: DataValue
    ) => boolean | undefined | string | Promise<boolean | undefined | string>
}

export interface Scheme {
    name: string
    tableName: SLUG
    fields?: Record<string, Field>
    actions?: {
        button: {
            label: string
            color: "danger" | "normal" | "accent"
        }
        func(selectedRecords: TableRecord[], scheme: Scheme): void
    }[]
}

export interface SchemeGroup {
    groupName: string
    content: Scheme[]
}

export type TableRecord = Record<string, DataValue> & {
    id: number
}
