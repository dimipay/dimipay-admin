import { NeoField } from "@/fields"
import { ChangeEventHandler, FocusEventHandler } from "react"

export interface NeoScheme {
    name: string
    slug: SLUG
    fields: Record<string, NeoField<any>>
    softDelete?: boolean
    defaultSort?: Sort
    searchableFields?: keyof this["fields"][]
    computedFields?: Record<
        string,
        {
            name: string
            func?: (data: TableRecord) => any
        }
    >
    panelComponents?: PanelComponent[]
    selectActions?: ToolbarAction[]
}

export interface Sort {
    field: string
    order: "123" | "321"
}

export enum SLUG {
    user = "user",
    product = "product",
    category = "category",
    posDevice = "posDevice",
    discountPolicy = "discountPolicy",
    event = "event",
    adminAccount = "adminAccount",
    paymentMethod = "paymentMethod",
    transaction = "transaction",
    productInOutLog = "productInOutLog",
    storeProducts = "storeProducts",
    adminRole = "adminRole",
}

export interface RelationItem {
    id: number
    displayName: string
    color?: string
}

export interface MultipleRelation {
    slug: SLUG
    target: RelationItem[]
}

export interface SingleRelation {
    slug: SLUG
    target: RelationItem
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
    | MultipleRelation
    | SingleRelation

export interface Option {
    label: string
    key?: string | number
    color?: string
    amount?: number
    disabled?: boolean
    icon?: JSX.Element
}

export interface ToolbarAction {
    button: {
        label: string
        color: "danger" | "normal" | "accent"
    }
    func(
        selectedRecords: TableRecord[],
        scheme: NeoScheme,
    ): void | Promise<void>
}

export type PanelComponent = React.FC<{
    scheme: NeoScheme
    record: TableRecord
    reload?: () => void
}>

export interface SchemeGroup {
    groupName: string
    content: NeoScheme[]
}

export type TableRecord = Record<string, DataValue> & {
    id: number
    createdAt: Date
    updatedAt: Date
}

export interface FormikHandlers {
    onChange: ChangeEventHandler<HTMLInputElement>
    onBlur: FocusEventHandler<any>
}

export type SetFieldValueFunction = (field: string, value: any) => any
