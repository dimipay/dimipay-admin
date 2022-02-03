import { styled } from "@/stitches.config"
import { Property } from "@stitches/react/types/css"

export const createTypo = (props: {
    fontSize: number
    fontWeight: Property.FontWeight
    spatialLetter?: boolean
    color?: string
}) =>
    styled("p", {
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
            strike: {
                true: {
                    textDecoration: "line-through",
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
        },
    })
