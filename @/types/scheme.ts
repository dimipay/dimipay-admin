import { Validate } from "react-hook-form"

interface Relation {
    target: string
    ids: string[]
}

export type DataValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | string[]
    | number[]
    | boolean[]
    | Relation

export interface Option {
    label: string
    key?: string | number
    color?: string
    amount?: number
}

export interface Field {
    display: string
    computed?(value: unknown): string
    disabled?: boolean
    additional?: {
        type: "multiple"
        options: Option[]
        map?: Record<string | number, string>
    }
    placeholder?: string
    required?: boolean
    validateFunc?: Validate<DataValue>
}

export interface Scheme {
    name: string
    tableName: string
    slug: string
    fields?: Record<string, Field>
}

export interface SchemeGroup {
    groupName: string
    content: Scheme[]
}
