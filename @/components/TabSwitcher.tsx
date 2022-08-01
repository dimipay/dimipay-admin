import { Hexile, Vexile } from "@haechi/flexile"
import { Description, Important } from "@/typo"
import { DividerLine } from "./atoms"

export const TabSwitcher: React.FC<{
    tabs: {
        label: string
        message?: string
    }[]
    selected?: number
    onTabChange?: (index: number) => void
}> = props => {
    return (
        <>
            {props.tabs.map((tabs, index) => (
                <Hexile
                    style={{
                        cursor: "pointer",
                    }}
                    gap={4}
                    key={tabs.label}
                    onClick={() => props.onTabChange?.(index)}>
                    <Vexile gap={2}>
                        <Hexile gap={1} y="center">
                            <Important
                                color={
                                    index === props.selected
                                        ? "accent"
                                        : "dark3"
                                }>
                                {tabs.label}
                            </Important>
                            <Description>{tabs.message}</Description>
                        </Hexile>
                        {index === props.selected && (
                            <DividerLine color="accent" bold />
                        )}
                    </Vexile>
                </Hexile>
            ))}
        </>
    )
}
