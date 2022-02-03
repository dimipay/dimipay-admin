import { DARKS, styled } from "@/stitches.config"

export const Button = styled("button", {
    backgroundColor: "$accent",
    border: "none",
    outline: "none",
    padding: "2rem 4rem",
    borderRadius: "2rem",
    color: "white !important",
    gap: "2rem",
    alignSelf: "stretch",
    high: "accent",
    animated: true,
    display: "flex",
    placeItems: "center",
    textAlign: "center",
    "&:focus": {
        boxShadow:
            "0px 1rem 2rem 0px #2EA4AB5C, inset 0rem 0rem 0px 0.5rem black",
    },
    variants: {
        big: {
            true: {
                padding: "4rem 6rem",
                gap: "3rem",
                display: "block",
            },
        },
        color: {
            black: {
                backgroundColor: "$dark1",
                high: "black",
            },
        },
    },
})
