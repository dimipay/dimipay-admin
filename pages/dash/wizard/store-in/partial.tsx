import { Button, Redirector } from "@/components"
import { useHover } from "@/functions"
import { config } from "@/stitches.config"
import { Store } from "@/types"
import { Decorative, Description, Important, Regular } from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"
import { HoverOverlay, StoreCard } from "./style"

export const StoreinProductTile: React.FC<{
    store: Store
    currentAmount: number
    color?: keyof typeof config.theme.colors
    active?: boolean
    onClick?: () => void
}> = ({ store, currentAmount, active, color, onClick }) => {
    const { events, hover } = useHover()

    return (
        <StoreCard
            padding={4}
            y="space"
            active={active}
            color={color ? color : active ? "accent" : undefined}
            relative
            {...events}>
            {onClick && hover && (
                <HoverOverlay
                    onClick={e => {
                        e.stopPropagation()
                        onClick?.()
                        ;(
                            e.currentTarget.children[0] as HTMLButtonElement
                        ).focus()
                    }}>
                    <Button fit color="black">
                        <Important white>갯수 줄이기</Important>
                    </Button>
                </HoverOverlay>
            )}
            <Vexile gap={1}>
                <Hexile gap={2} y="center">
                    <Decorative color={color}>{currentAmount}개</Decorative>
                    <Regular color={color}> / {store.amount}개</Regular>
                </Hexile>
                <Regular>{store.name}</Regular>
            </Vexile>
            <Description>{store.barcode}</Description>
        </StoreCard>
    )
}

export default Redirector
