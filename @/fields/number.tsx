import { Input } from "@/components"
import { Description, Regular } from "@/typo"
import { Vexile } from "@haechi/flexile"
import { FieldComponent, FieldFunction, FieldProps } from "."

export const NumberFieldComponent: FieldComponent<number> = props => {
    const placeholder = props.field.autoGenerative
        ? "자동으로 설정됩니다"
        : props.field.placeholder

    return (
        <Vexile gap={1}>
            <Input
                value={props.value}
                placeholder={placeholder}
                label={props.field.displayName}
                error={props.error}
                disabled={props.disabled}
                name={props.name}
                type="number"
                {...props.handlers}
            />
            {props.field.description && (
                <Description>{props.field.description}</Description>
            )}
        </Vexile>
    )
}

export const number: FieldFunction<number> = field => ({
    field,
    EditComponent: NumberFieldComponent,
    format: {
        beforeSave(value) {
            return +value
        },
        parseFromString(value) {
            return +value
        },
    },
    type: "NUMBER",
    TableComponent({ value }) {
        if (value === undefined || value === null) return <></>
        return <Regular monospace>{(+value).toLocaleString()}</Regular>
    },
})
