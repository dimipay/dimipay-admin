import { FieldFunction, FieldProps } from ".";
import { TextFieldComponent } from "./text";
export const number: FieldFunction<string> = (field) => ({
    field,
    EditComponent: TextFieldComponent,
    format: {
        beforeSave(value) {
            return +value
        },
    },
    type: "NUMBER",
})
