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
    | DataValue[]
    | Relation

export interface Field {
    display: string
    computed?(value: unknown): string
    readonly?: boolean
    additional?: {
        type: "multiple"
        options: string[] | number[]
        map?: Record<string | number, string | number | boolean>
    }
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
