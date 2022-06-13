export interface Statistics {
    pie?: {
        label: string
        ratio: number
    }[]
    number?: {
        value: number
        prefix?: string
        suffix?: string
    }
    list?: {
        label: string
        secondaryLabel?: string
    }[]
}
