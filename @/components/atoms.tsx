import { styled } from "@/stitches.config"
import Link from "next/link"

export const PlainLink = styled(Link, {
    textDecoration: "none",
    color: "inherit",
})

export const DividerLine = styled("div", {
    border: "0.1rem solid $dark5",
    zIndex: 1,
})
