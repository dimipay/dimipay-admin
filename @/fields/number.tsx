import { Regular } from "@/typo"
import { FieldFunction, FieldProps } from "."
import { TextFieldComponent } from "./text"

export const number: FieldFunction<string> = (field) => ({
    field,
    EditComponent: TextFieldComponent,
    format: {
        beforeSave(value) {
            return +value
        },
    },
    type: "NUMBER",
    TableComponent({ value }) {
        if (value === undefined || value === null) return <></>
        return <Regular monospace>{(+value).toLocaleString()}</Regular>
    },
})
