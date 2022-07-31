import { Card } from "@/components"
import { config, styled } from "@/stitches.config"

export const StoreCard = styled(Card, {
    width: "36rem",
    height: "36rem",
    wordBreak: "break-all",
    variants: {
        active: {
            true: {
                high: "accent"
            },
        },
        color: Object.fromEntries(
            Object.keys(config.theme.colors).map(key => [
                key,
                {
                    borderColor: `$${key}`,
                    borderWidth: "0.6rem"
                },
            ]),
        ) as Record<
            keyof typeof config.theme.colors,
            {
                borderColor: string
                borderWidth: string
            }
        >,
    },
})
