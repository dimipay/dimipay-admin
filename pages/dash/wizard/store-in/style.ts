import { Card, Redirector } from "@/components"
import { config, styled } from "@/stitches.config"
import { Vexile } from "@haechi/flexile"

export const StoreCard = styled(Card, {
    width: "36rem",
    height: "36rem",
    wordBreak: "break-all",
    variants: {
        active: {
            true: {
                high: "accent",
            },
        },
        color: Object.fromEntries(
            Object.keys(config.theme.colors).map(key => [
                key,
                {
                    borderColor: `$${key}`,
                    borderWidth: "0.6rem",
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

export const HoverOverlay = styled("div", {
    position: "absolute",
    backgroundColor: "rgba(255 255 255 / 0.6)",
    left: "-0.5rem",
    top: "-0.5rem",
    right: "-0.5rem",
    bottom: "-0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
})

export default Redirector
