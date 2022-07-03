import { Vexile } from "@haechi/flexile"
import { styled } from "@stitches/react"

export const ModalBackdrop = styled(Vexile, {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    position: "fixed",
    zIndex: 1,
    padding: "3rem",
})

export const ModalWrapper = styled(Vexile, {
    backgroundColor: "white",
    maxWidth: "120rem",
    borderRadius: "2rem",
})
