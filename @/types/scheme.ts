export enum SLUG {
    user = "user",
    product = "product",
    category = "category",
    posDevice = "posDevice",
    discountPolicy = "discountPolicy",
    event = "event",
    adminAccount = "adminAccount",
    paymentMethod = "paymentMethod",
}

export interface Relation {
    slug: string
    target: {
        id: string
        displayName: string
        color?: string
    }[]
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

export interface SingleRelationField {
    type: "relation-single"
    target: SLUG
    default?: string
    flattenField?: string
    displayNameField: string
}

export interface MultipleRelationField
    extends Omit<SingleRelationField, "type"> {
    type: "relation-multiple"
}

export const isMultipleSelect = (d: any): d is MultipleSelectField =>
    d.type === "multiple"

export interface Field {
    displayName: string
    invisibleInTable?: boolean
    description?: string
    computed?(value: DataValue): string
    autoGenerative?: boolean
    readOnly?: boolean
    typeOption: (
        | MultipleSelectField
        | SingleRelationField
        | MultipleRelationField
        | {
              type: "boolean"
              default?: boolean
          }
        | {
              type: "string" | "date" | "password" | "color"
              default?: string
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
    saveWithComputed?: (data: DataValue) => DataValue | Promise<DataValue>
}

export interface ToolbarAction {
    button: {
        label: string
        color: "danger" | "normal" | "accent"
    }
    func(selectedRecords: TableRecord[], scheme: Scheme): void | Promise<void>
}

export type PanelComponent = React.FC<{
    scheme: Scheme
    record: TableRecord
    reload: () => void
}>

export interface Scheme {
    displayName: string
    tableName: SLUG
    fields: Record<string, Field>
    computedFields?: Record<
        string,
        {
            func?(record: TableRecord): Promise<DataValue> | DataValue
            displayName: string
        }
    >
    actions?: ToolbarAction[]
    panelComponents?: PanelComponent[]
    isUUIDPk?: boolean
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
