import { styled } from "@/stitches.config"

export const LogicalInput = styled("input", {
    border: "none",
    borderBottom: "0.5rem solid $accent",
    fontSize: "4rem",
    color: "$accent",
    width: "20rem",
    "&::placeholder": {
        color: "$accent",
        opacity: 1,
    },
})
