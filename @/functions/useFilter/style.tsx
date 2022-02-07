import { styled } from "@/stitches.config"
import { Hexile } from "@haechi/flexile"

export const ItemWrapper = styled(Hexile, {
    card: "$accent",
    pointerEvents: "auto",
    variants: {
        disabled: {
            true: {
                filter: "saturate(0)",
            },
        },
    },
})
