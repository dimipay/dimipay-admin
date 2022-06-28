import { searchIcon } from "@/assets"
import { LoadSVG } from "../LoadSVG"
import { LogicalInput, Wrapper } from "./style"

export const InlineInput: React.FC<{
    children: string
    onChange?(content: string): void
}> = (props) => {
    return (
        <Wrapper filly y="center" x="space">
            <LogicalInput
                onChange={(e) => props.onChange?.(e.target.value)}
                placeholder={props.children}
            />
            <LoadSVG
                src={searchIcon}
                height={4}
                width={4}
                alt="빠른 찾기 아이콘"
            />
        </Wrapper>
    )
}
