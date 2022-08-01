import { Redirector } from "@/components"
import { config } from "@/stitches.config"
import { Store } from "@/types"
import { Decorative, Description, Regular } from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"
import { StoreCard } from "./style"

export const StoreinProductTile: React.FC<{
    store: Store
    currentAmount: number
    color?: keyof typeof config.theme.colors
    active?: boolean
}> = ({ store, currentAmount, active, color }) => {
    return (
        <StoreCard
            padding={4}
            y="space"
            active={active}
            color={color ? color : active ? "accent" : undefined}>
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
