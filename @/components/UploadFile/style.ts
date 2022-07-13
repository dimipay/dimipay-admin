import { MAIN_ACCENT, styled } from "@/stitches.config"
import { Vexile } from "@haechi/flexile"

export const UploadField = styled(Vexile, {
    backgroundColor: "$dark6",
    borderRadius: "2rem",
    animated: true,
    position: "relative",
    variants: {
        isFileHovered: {
            true: {
                boxShadow: `inset ${MAIN_ACCENT} 0rem 0rem 0rem 1rem`,
            },
        },
    },
})

export const LogicalInput = styled("input", {
    inset: "0rem",
    width: "100%",
    opacity: 0,
    position: "absolute",
    display: "block",
})
