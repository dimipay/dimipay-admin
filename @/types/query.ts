import { get와과, get으로, get을를, get이가 } from "josa-complete"
import { Field } from "."

export type Operator = keyof typeof korOperatorMap

interface OperatorMap {
    appender?: (value: string) => string
    display: string
    type: Field["additional"]["type"][]
}

export const korOperatorMap: Record<string, OperatorMap> = {
    "=": {
        appender: get와과,
        display: "같다",
        type: ["string", "number", "date"],
    },
    ">": {
        display: "보다 크다",
        type: ["number", "date"],
    },
    ">=": {
        display: "보다 크거나 같다",
        type: ["number", "date"],
    },
    "<": {
        display: "보다 작다",
        type: ["number", "date"],
    },
    "<=": {
        display: "보다 작거나 같다",
        type: ["number", "date"],
    },
    contains: {
        appender: get을를,
        display: "포함한다",
        type: ["string"],
    },
    in: {
        display: "중에 있다",
        type: ["string", "number", "date"],
    },
    notIn: {
        display: "중에 없다",
        type: ["string", "number", "date"],
    },
    startsWith: {
        appender: get으로,
        display: "시작한다",
        type: ["string"],
    },
    endsWith: {
        appender: get으로,
        display: "끝난다",
        type: ["string"],
    },
    not: {
        appender: get이가,
        display: "아니다",
        type: ["string", "number", "boolean", "date"],
    },
}

export type Filter = [string, Operator, string | number]
export type PartialFilter = [
    string,
    Operator | undefined,
    string | number | undefined
]
