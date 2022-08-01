import { Redirector } from "@/components"
import { styled } from "@/stitches.config"
import { Hexile } from "@haechi/flexile"

export const ExampleTable = styled("table", {
    backgroundColor: "$dark6",
    borderRadius: "2rem",
    pading: "3rem",
})

export const FieldItem = styled("div", {
    backgroundColor: "$dark6",
    padding: "2rem 3rem",
    position: "relative",
    borderRadius: "2rem",
})

export const CheckPreviewBar = styled(Hexile, {
    card: "grey",
})

export default Redirector
