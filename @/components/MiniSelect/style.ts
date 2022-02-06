import { styled } from "@/stitches.config"

export const LogicalInput = styled("input", {
    border: "none",
    borderBottom: "0.5rem solid $accent",
    fontSize: "4rem",
    color: "$accent",
    textAlign: "center",
    width: "20rem",
})

export const Wrapper = styled("div", {
    borderBottom: "0.5rem solid $accent",
    position: "relative",
})

export const ListWrapper = styled("div", {
    card: "grey",
    position: "absolute",
    width: "30rem",
    bottom: "3rem",
})
