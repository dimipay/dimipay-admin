import { styled } from "@/stitches.config"
import { Vexile } from "@haechi/flexile"

export const ModalBackdrop = styled(Vexile, {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    position: "fixed",
    zIndex: 2,
    padding: "3rem",
})

export const ModalWrapper = styled(Vexile, {
    backgroundColor: "white",
    maxWidth: "120rem",
    maxHeight: "calc(100vh - 12rem)",
    borderRadius: "2rem",
    overflowY: "auto",
    variants: {
        isWide: {
            true: {
                maxWidth: "min(180rem, 100vw - 40rem)",
            },
        },
    },
})
