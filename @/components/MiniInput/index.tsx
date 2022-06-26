import { LogicalInput } from "./style"

export const MiniInput: React.FC<{
    onChange: (value: string) => void
    placeholder?: string
    type?: "number"
    value?: string
}> = (props) => {
    return (
        <LogicalInput
            type={props.type}
            placeholder={props.placeholder}
            onChange={(e) => props.onChange(e.currentTarget.value)}
            value={props.value}
        />
    )
}
