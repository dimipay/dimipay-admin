import { config, styled } from "@/stitches.config"
import { Property } from "@stitches/react/types/css"
import { ComponentType } from "react"

export const createTypo = (props: {
    fontSize: number
    fontWeight: Property.FontWeight
    spatialLetter?: boolean
    color?: string
    element?: keyof JSX.IntrinsicElements | ComponentType<any>
}) =>
    styled(props.element || "p", {
        fontSize: props.fontSize + "rem",
        fontWeight: props.fontWeight,
        color: props.color || "$dark1",
        letterSpacing: props.spatialLetter ? "unset" : "-0.03em",
        margin: 0,
        variants: {
            accent: {
                true: {
                    color: "$accent",
                },
            },
            white: {
                true: {
                    color: "white",
                },
            },
            strike: {
                true: {
                    textDecoration: "line-through",
                },
            },
            underline: {
                true: {
                    textDecoration: "underline",
                },
            },
            notight: {
                true: {
                    letterSpacing: "0em",
                },
            },
            center: {
                true: {
                    textAlign: "center",
                },
            },
            dark: Object.fromEntries(
                [...Array(6)].map((_, i) => [
                    i,
                    {
                        color: `$dark` + i,
                    },
                ])
            ),
            color: Object.fromEntries(
                Object.keys(config.theme.colors).map((key) => [
                    key,
                    {
                        color: `$${key}`,
                    },
                ])
            ) as Record<
                keyof typeof config.theme.colors,
                {
                    color: string
                }
            >,
        },
    })
