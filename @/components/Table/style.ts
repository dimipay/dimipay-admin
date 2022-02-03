import { Vexile } from "@haechi/flexile"
import { styled } from "@stitches/react"

export const TableWrapper = styled(Vexile, {
    backgroundColor: "white",
    borderRadius: "2rem",
    border: "0.5rem solid $dark5",
})

export const TableContent = styled("table", {
    height: "100%",
})

export const Cell = styled("td", {
    padding: "3rem",
})

export const HeaderCell = styled("th", {
    padding: "3rem",
    textAlign: "left",
})
