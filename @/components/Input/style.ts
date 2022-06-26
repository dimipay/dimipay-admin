import { styled } from "@/stitches.config"
import { Vexile } from "@haechi/flexile"

export const InputWraper = styled(Vexile, {
    border: "0.5rem solid $dark5",
    backgroundColor: "$dark6",
    borderRadius: "2rem",
    animated: true,
    "&:focus-within": {
        borderColor: "$accent",
        backgroundColor: "white",
        elevated: true,
    },
    variants: {
        disabled: {
            true: {
                borderColor: "$dark4",
                backgroundColor: "$dark5",
            },
        },
        hasError: {
            true: {
                borderColor: "$error",
                "&:focus-within": {
                    borderColor: "$error",
                },
            },
        },
    },
})

const colorchipStyle = {
    borderRadius: "1rem",
    border: "none",
    display: "inline-block",
}

export const LogicalInput = styled("input", {
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "4rem",
    color: "$dark1",
    variants: {
        colorchip: {
            true: {
                width: "6rem",
                height: "6rem",
                "&::-moz-color-swatch": colorchipStyle,
                "&::-webkit-color-swatch": colorchipStyle,
                "&::-ms-color-swatch": colorchipStyle,
                "&::color-swatch": colorchipStyle,
            },
        },
    },
    "&::placeholder": {
        color: "$dark3",
    }
})
