import { FieldType } from "@/fields"
import { get와과, get으로, get을를, get이가 } from "josa-complete"

export type Operator = keyof typeof korOperatorMap

interface OperatorMap {
    appender?: (value: string) => string
    display: string
    type: FieldType[]
}

export const korOperatorMap: Record<string, OperatorMap> = {
    "=": {
        appender: get와과,
        display: "같다",
        type: ["TEXT", "NUMBER", "DATE"],
    },
    ">": {
        display: "보다 크다",
        type: ["NUMBER", "DATE"],
    },
    ">=": {
        display: "보다 크거나 같다",
        type: ["NUMBER", "DATE"],
    },
    "<": {
        display: "보다 작다",
        type: ["NUMBER", "DATE"],
    },
    "<=": {
        display: "보다 작거나 같다",
        type: ["NUMBER", "DATE"],
    },
    contains: {
        appender: get을를,
        display: "포함한다",
        type: ["TEXT"],
    },
    in: {
        display: "중에 있다",
        type: ["TEXT", "NUMBER", "DATE"],
    },
    notIn: {
        display: "중에 없다",
        type: ["TEXT", "NUMBER", "DATE"],
    },
    startsWith: {
        appender: get으로,
        display: "시작한다",
        type: ["TEXT"],
    },
    endsWith: {
        appender: get으로,
        display: "끝난다",
        type: ["TEXT"],
    },
    not: {
        appender: get이가,
        display: "아니다",
        type: ["TEXT", "NUMBER", "DATE"],
    },
}

export type Filter = [string, Operator, string | number]
export type PartialFilter = [
    string,
    Operator | undefined,
    string | number | undefined,
]
