import { Card } from "@/components"
import { styled } from "@/stitches.config"

export const StoreCard = styled(Card, {
    width: "36rem",
    height: "36rem",
    wordBreak: "break-all",
    variants: {
        active: {
            true: {
                // borderColor: "$accent",
                // borderWidth: "0.6rem",
                high: "accent"
            },
        },
    },
})
