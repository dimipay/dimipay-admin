import { Regular, Token } from "@/typo"
import { UseFormRegisterReturn } from "react-hook-form"
import { InputWraper } from "../Input/style"

export const DateInput: React.FC<{
    error?: string
    name: string
    defaultValue?: Date
    placeholder: string
    disabled?: boolean
    hooker?: UseFormRegisterReturn
}> = (props) => {
    return (
        <InputWraper
            gap={1.5}
            padding={3}
            hasError={!!props.error}
            disabled={props.disabled}
        >
            <Token>{props.name}</Token>
            <Regular dark={props.disabled ? 3 : 1}>
                {props.defaultValue || props.placeholder}
            </Regular>
        </InputWraper>
    )
}
