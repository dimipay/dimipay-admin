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
                "&:focus > div:first-of-type, &:focus-within": {
                    borderColor: "$accent",
                    backgroundColor: "white",
                    zIndex: 1,
                    elevated: true,
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

export const SearchInput = styled("input", {
    width: "100%",
    boxSizing: "border-box",
    display: "block",
    border: "none",
    outline: "none",
    fontSize: "3.5rem",
    background: "transparent",
})

export const Searhbox = styled(Hexile, {
    borderBottom: "0.5rem solid $dark5",
    boxSizing: "content-box",
    overflow: "hidden",
    "&:focus-within": {
        elevated: 1,
    },
})
