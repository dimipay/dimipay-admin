import { Token } from "@/typo"
import { Ref } from "react"
import { InputWraper, LogicalInput } from "./style"

export const Input: React.FC<{
    placeholder: string
    name: string
    ref?: Ref<HTMLInputElement>
    hideContent?: boolean
}> = (props) => (
    <label>
        
    <InputWraper gap={1.5} padding={3}>
        <Token>{props.name}</Token>
        <LogicalInput
            ref={props.ref}
            placeholder={props.placeholder}
            {...(props.hideContent && {
                type: "password",
            })}
        />
    </InputWraper>
    </label>
)
