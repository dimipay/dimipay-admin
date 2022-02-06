import { styled } from "@/stitches.config"
import { Hexile, Vexile } from "@haechi/flexile"
import { InputWraper } from "../Input/style"

export const DataView = styled(InputWraper, {
    outline: "none",
    margin: "-0.5rem",
})

export const Wrapper = styled(Vexile, {
    border: "0.5rem solid $dark5",
    borderRadius: "2rem",
    variants: {
        hasError: {
            true: {
                "&:focus > div:first-of-type": {
                    borderColor: "$error",
                },
            },
        },
        disabled: {
            false: {
                "&:focus": {
                    elevated: true,
                },
                "&:focus > div:first-of-type": {
                    borderColor: "$accent",
                    backgroundColor: "white",
                    zIndex: 1,
                },
            },
        },
    },
})

export const Item = styled(Hexile, {
    borderRadius: "2rem",
    variants: {
        selected: {
            true: {
                backgroundColor: "$dark6",
            },
        },
    },
})
