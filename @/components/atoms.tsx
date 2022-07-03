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

export const HitSlop = styled("div", {
    padding: "2rem",
    margin: "-2rem",
})

export const ColorBubble: React.FC<{ color: string }> = ({ color }) => (
    <div
        style={{
            width: "2rem",
            height: "2rem",
            backgroundColor: color,
            borderRadius: "2rem",
        }}
    />
)

export const Accent = styled("span", {
    color: "$accent",
})
