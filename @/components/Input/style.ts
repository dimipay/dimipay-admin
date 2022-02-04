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
    },
})

export const LogicalInput = styled("input", {
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "4rem",
    color: "$dark1",
})
