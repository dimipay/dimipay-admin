import { searchIcon } from "@/assets"
import { useEffect, useRef } from "react"
import { LoadSVG } from "../LoadSVG"
import { LogicalInput, Wrapper } from "./style"

export const InlineInput: React.FC<{
    children: string
    onChange?(content: string): void
    focusHandler?(focus: () => void): void
}> = props => {
    const ref = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (!props.focusHandler) return

        props.focusHandler(() => {
            if (!ref.current) {
                console.log("Input is not initialized")
                return
            }
            ref.current.focus()
        })
    }, [ref])

    return (
        <Wrapper filly y="center" x="space">
            <LogicalInput
                onChange={e => props.onChange?.(e.target.value)}
                ref={ref}
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
