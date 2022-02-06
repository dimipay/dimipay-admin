import { LogicalInput } from "./style"

export const MiniInput: React.FC<{
    onChange: (value: string) => void
    placeholder?: string
}> = (props) => {
    return (
        <LogicalInput
            placeholder={props.placeholder}
            onChange={(e) => props.onChange(e.currentTarget.value)}
        />
    )
}
