export interface Scheme {
    name: string
    tableName: string
    slug: string
    fields?: {
        [key: string]: {
            display: string | boolean
            computed?(value: unknown): string
        }
    }
}

export interface SchemeGroup {
    groupName: string
    content: Scheme[]
}
