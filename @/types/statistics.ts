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

export interface StatisticsCard {
    name: string
    id: string
    type: "number" | "text" | "pie" | "list"
    computedField?: (
        statistics: Record<string, Statistics | null>,
    ) => Promise<Statistics | null> | Statistics | null
}
