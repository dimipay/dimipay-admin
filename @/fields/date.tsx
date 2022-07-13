import { Input } from "@/components"
import { Description, Regular } from "@/typo"
import { Vexile } from "@haechi/flexile"
import { FieldComponent, FieldFunction, FieldProps } from "."

type DateProps = FieldProps<string>

export const DateFieldComponent: FieldComponent<string> = props => {
    const placeholder = props.field.autoGenerative
        ? "자동으로 설정됩니다"
        : props.field.placeholder

    return (
        <Vexile gap={1}>
            <Input
                value={
                    props.value &&
                    new Date(props.value.toString()).toISOString().split("T")[0]
                }
                placeholder={placeholder}
                label={props.field.displayName}
                error={props.error}
                disabled={props.disabled}
                name={props.name}
                type="date"
                {...props.handlers}
            />
            {props.field.description && (
                <Description>{props.field.description}</Description>
            )}
        </Vexile>
    )
}

export const date: FieldFunction<string, DateProps> = (field: DateProps) => ({
    field,
    EditComponent: DateFieldComponent,
    TableComponent: ({ value }) => {
        if (!value) return <></>
        return (
            <Regular>
                {new Date(value.toString()).toISOString().split("T")[0]}
            </Regular>
        )
    },
    type: "DATE",
    format: {
        beforeSave(value) {
            if (value) {
                return new Date(value)
            }

            return undefined
        },
        parseFromString(value) {
            return new Date(value).toISOString()
        },
    },
})
