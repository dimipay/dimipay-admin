import { styled } from "@/stitches.config"

export const Wrapper = styled("div", {
    backgroundColor: "$dark6",
    padding: "2rem 3rem",
    position: "relative",
    borderRadius: "2rem"
})

export const ListWrapper = styled("div", {
    card: "grey",
    position: "absolute",
    width: "30rem",
    top: "10rem",
    zIndex: 2
})
