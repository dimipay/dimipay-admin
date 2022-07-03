import { styled } from "@/stitches.config"
import { Vexile } from "@haechi/flexile"

export const Wrapper = styled(Vexile, {
    card: "grey",
    elevated: false,
    maxWidth: "120rem",
    width: "100%",
    variants: {
        noMaxWidth: {
            true: {
                maxWidth: "unset",
            },
        },
    },
})
