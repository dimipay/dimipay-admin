import {
    TooltipWrapper,
    Cell,
    HeaderCell,
    SortArrow,
    HighlightableTableRow,
} from "./style"
import React, { forwardRef, useState } from "react"
import { DividerLine, ModifyRecord } from ".."
import { Important, Regular } from "@/typo"
import { useRecoilState, useSetRecoilState } from "recoil"
import { selectedRowAtom, subContentAtom } from "@/coil"
import { TableRecord } from "@/types"
import { NeoScheme } from "@/schemes"

export const Row = forwardRef<
    HTMLTableRowElement,
    {
        selected: boolean
        onCheckboxClicked: (selected: boolean) => void
        onReloadRequested: () => void
        row: TableRecord
        scheme: NeoScheme
    }
>(({ row, ...props }, ref) => {
    const setSubContent = useSetRecoilState(subContentAtom)
    const [selectedRow, setSelectedRow] = useRecoilState(selectedRowAtom)

    return (
        <HighlightableTableRow
            ref={ref}
            elevated={selectedRow?.id === row.id}
            onClick={() => {
                setSelectedRow(row)
                setSubContent({
                    element: (
                        <ModifyRecord
                            onReloadRequested={props.onReloadRequested}
                            scheme={props.scheme}
                        />
                    ),
                    name: props.scheme.name,
                })
            }}
        >
            <Cell>
                <input
                    type="checkbox"
                    checked={props.selected}
                    readOnly
                    onClick={(e) => {
                        props.onCheckboxClicked(props.selected)
                        e.stopPropagation()
                    }}
                />
            </Cell>
            {Object.entries(props.scheme.fields).map(
                ([key, field]) =>
                    !field.field.invisibleInTable && (
                        <Cell key={key}>
                            {field.TableComponent ? (
                                <field.TableComponent value={row[key]} />
                            ) : (
                                <Regular>{row[key]?.toString()}</Regular>
                            )}
                        </Cell>
                    )
            )}
            {props.scheme.computedFields &&
                Object.keys(props.scheme.computedFields).map((key) => (
                    <Cell key={key}>
                        <Regular>{row[key]}</Regular>
                    </Cell>
                ))}
        </HighlightableTableRow>
    )
})

export const ActionableHeaderCell: React.FC<{
    onSort?(): void
    onFilter?(): void
    isSorted?: boolean
    sortDirection?: "123" | "321"
}> = (props) => {
    const [isActionsVisible, showActions] = useState(false)

    return (
        <HeaderCell onClick={() => showActions((prev) => !prev)}>
            {props.sortDirection && (
                <SortArrow>
                    {props.sortDirection === "123" ? "↑" : "↓"}
                </SortArrow>
            )}
            <Regular dark={4}>{props.children}</Regular>
            {isActionsVisible && (
                <TooltipWrapper gap={3} paddingx={4} paddingy={3}>
                    <Important accent onClick={props.onSort}>
                        정렬
                    </Important>
                    <DividerLine />
                    <Important accent onClick={props.onFilter}>
                        필터
                    </Important>
                </TooltipWrapper>
            )}
        </HeaderCell>
    )
}
