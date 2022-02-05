import { Hexile, Vexile } from "@haechi/flexile"
import { styled } from "@stitches/react"

export const TableWrapper = styled(Vexile, {
    backgroundColor: "white",
    borderRadius: "2rem",
    border: "0.5rem solid $dark5",
})

export const TableContent = styled("table", {
    // height: "100%",
    width: "100%",
})

export const Cell = styled("td", {
    padding: "3rem 5rem",
    whiteSpace: "nowrap",
    "&:last-child": {
        width: "100%",
    },
})

export const HeaderCell = styled("th", {
    padding: "3rem 4rem",
    textAlign: "left",
    whiteSpace: "nowrap",
    borderBottom: "0.5rem solid $dark5",
    "&:last-child": {
        width: "100%",
    },
})

export const ActionToolbars = styled(Hexile, {
    borderTop: "0.5rem solid $dark5",
})
