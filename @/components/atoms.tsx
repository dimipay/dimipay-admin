import { config, styled } from "@/stitches.config"
import { Vexile } from "@haechi/flexile"
import Link from "next/link"

export const PlainLink = styled(Link, {
    textDecoration: "none",
    color: "inherit",
})

export const DividerLine = styled("div", {
    border: "0.1rem solid $dark5",
    zIndex: 1,
    boxSizing: "border-box",
    backgroundColor: "$dark5",
    variants: {
        bold: {
            true: {
                borderWidth: "0.3rem",
            },
        },
        color: Object.fromEntries(
            Object.keys(config.theme.colors).map(key => [
                key,
                {
                    borderColor: `$${key}`,
                    backgroundColor: `$${key}`,
                },
            ]),
        ) as Record<
            keyof typeof config.theme.colors,
            {
                borderColor: string
                backgroundColor: string
            }
        >,
    },
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

export const Ul = styled("ul", {
    paddingLeft: "6rem",
    "&>li+li": {
        marginTop: "2rem",
    },
})

export const Card = styled(Vexile, {
    backgroundColor: "white",
    borderRadius: "2rem",
    border: "0.5rem solid $dark5",
    variants: {
        color: Object.fromEntries(
            Object.keys(config.theme.colors).map(key => [
                key,
                {
                    borderColor: `$${key}`,
                },
            ]),
        ) as Record<
            keyof typeof config.theme.colors,
            {
                borderColor: string
            }
        >,
    },
})

Card.defaultProps = {
    padding: 4,
    gap: 3,
}
