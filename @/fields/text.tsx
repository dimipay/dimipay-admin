import { FieldComponent, FieldFunction, FieldProps } from "."
import { Vexile } from "@haechi/flexile"
import { Input } from "@/components"
import { Description, Regular } from "@/typo"

interface TextProps extends FieldProps<string> {
    monospace?: boolean
}

export const TextFieldComponent: FieldComponent<string> = props => {
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
                {...props.handlers}
            />
            {props.field.description && (
                <Description>{props.field.description}</Description>
            )}
        </Vexile>
    )
}

export const text: FieldFunction<string, TextProps> = field => ({
    field,
    EditComponent: TextFieldComponent,
    type: "TEXT",
    format: {
        parseFromString(value) {
            return value.toString()
        },
    },
    TableComponent({ value }) {
        if (!value) return <></>

        return <Regular monospace={field.monospace}>{value}</Regular>
    },
})
