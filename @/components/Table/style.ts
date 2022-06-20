import { styled } from "@/stitches.config"
import { Description } from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"

export const TableWrapper = styled(Vexile, {
    backgroundColor: "white",
    borderRadius: "2rem",
    border: "0.5rem solid $dark5",
    position: "relative",
})

export const TableContent = styled("table", {
    width: "100%",
})

export const Cell = styled("td", {
    padding: "3rem 5rem",
    whiteSpace: "nowrap",
    maxWidth: "50rem",
    "&>p": {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    "&:last-child": {
        width: "100%",
        maxWidth: "unset",
    },
})

export const HeaderCell = styled("th", {
    padding: "3rem 5rem",
    textAlign: "left",
    whiteSpace: "nowrap",
    borderBottom: "0.5rem solid $dark6",
    position: "sticky",
    overflow: "auto",
    top: "0rem",
    backgroundColor: "white",
    "&:last-child": {
        width: "100%",
    },
})

export const ActionToolbars = styled(Hexile, {
    borderTop: "0.5rem solid $dark5",
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    bottom: "0rem"
})

export const TooltipWrapper = styled(Hexile, {
    position: "fixed",
    card: "$accent",
    zIndex: 1,
})

export const SortArrow = styled(Description, {
    position: "absolute",
    left: "0rem",
})
