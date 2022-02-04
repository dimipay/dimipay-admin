import { Token } from "@/typo"
import { UseFormRegisterReturn } from "react-hook-form"
import { InputWraper, LogicalInput } from "./style"

export const Input: React.FC<{
    placeholder: string
    name: string
    hideContent?: boolean
    hooker?: UseFormRegisterReturn
    defaultValue?: string
    disabled?: boolean
    type?: "number"
    error?: string
}> = (props) => (
    <label>
        <InputWraper
            gap={1.5}
            padding={3}
            disabled={props.disabled}
            hasError={!!props.error}
        >
            <Token>{props.name}</Token>
            <LogicalInput
                type={props.type}
                disabled={props.disabled}
                {...props.hooker}
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                {...(props.hideContent && {
                    type: "password",
                })}
            />
            {props.error && <Token color="error">{props.error}</Token>}
        </InputWraper>
    </label>
)
