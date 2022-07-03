import React, { useCallback, useEffect, useState } from "react"

import { NeoScheme, TableRecord, ToolbarAction } from "@/types"
import { Description, Important } from "@/typo"

import { ActionToolbars, HeaderCell, TableContent, TableWrapper } from "./style"
import { ActionableHeaderCell, Row } from "./partial"
import { Button, DividerLine } from ".."
import { Hexile, Vexile } from "@haechi/flexile"
import { useInView } from "react-intersection-observer"

export const Table: React.FC<{
    scheme: NeoScheme
    records: TableRecord[]
    onReloadRequested?(): void
    addFilter?(key: string): void
    setSort?(key: string): void
    sortField?: string | null
    sortDirection?: "123" | "321" | null
    goPageBy?: (delta: number) => void
    isLoading?: boolean
    enablePagination?: boolean
    focusSearch?: () => void
}> = ({ records: data, ...props }) => {
    const [selectedRecordIds, setSelectedRecordIds] = React.useState<number[]>(
        []
    )

    useEffect(() => {
        const keyboardHandler = (e: KeyboardEvent) => {
            if ((e.target as HTMLElement).tagName !== "BODY") return

            if (e.key === "ArrowRight") {
                props.goPageBy?.(1)
            } else if (e.key === "ArrowLeft") {
                props.goPageBy?.(-1)
            } else if (e.key === "q") {
                props.focusSearch?.()
                e.preventDefault()
            }
        }

        document.body.addEventListener("keydown", keyboardHandler)

        return () => {
            document.body.removeEventListener("keydown", keyboardHandler)
        }
    }, [props.goPageBy])

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Vexile gap={4} filly>
                <TableWrapper
                    fillx
                    filly
                    scrollx
                    y="space"
                    isLoading={props.isLoading}
                >
                    <TableContent>
                        <thead>
                            <tr>
                                <HeaderCell>
                                    <input
                                        type="checkbox"
                                        onChange={(e) =>
                                            setSelectedRecordIds(
                                                e.currentTarget.checked
                                                    ? data.map((e) => e.id)
                                                    : []
                                            )
                                        }
                                    />
                                </HeaderCell>
                                {Object.entries(props.scheme.fields).map(
                                    ([key, field]) =>
                                        !field.field.invisibleInTable && (
                                            <ActionableHeaderCell
                                                key={key}
                                                onFilter={() =>
                                                    props.addFilter?.(key)
                                                }
                                                sortDirection={
                                                    (props.sortField === key &&
                                                        props.sortDirection) ||
                                                    undefined
                                                }
                                                onSort={() =>
                                                    props.setSort?.(key)
                                                }
                                            >
                                                {field.field.displayName || key}
                                            </ActionableHeaderCell>
                                        )
                                )}
                                {props.scheme.computedFields &&
                                    Object.entries(
                                        props.scheme.computedFields
                                    ).map(([key, field]) => (
                                        <ActionableHeaderCell key={key}>
                                            {field.name}
                                        </ActionableHeaderCell>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <Row
                                    key={row.id}
                                    selected={selectedRecordIds.includes(
                                        row.id
                                    )}
                                    onReloadRequested={props.onReloadRequested}
                                    onCheckboxClicked={(selected) => {
                                        if (selected)
                                            setSelectedRecordIds((prev) =>
                                                prev.filter(
                                                    (id) => id !== row.id
                                                )
                                            )
                                        else
                                            setSelectedRecordIds((prev) => [
                                                ...prev,
                                                row.id,
                                            ])
                                    }}
                                    row={row}
                                    scheme={props.scheme}
                                />
                            ))}
                        </tbody>
                    </TableContent>
                    {selectedRecordIds.length !== 0 && (
                        <ActionToolbars gap={2} padding={4}>
                            {props.scheme.selectActions?.length ? (
                                props.scheme.selectActions?.map(
                                    (action: ToolbarAction) => (
                                        <Button
                                            key={action.button.label}
                                            onClick={async () => {
                                                await action.func(
                                                    data.filter((d) =>
                                                        selectedRecordIds.includes(
                                                            d.id
                                                        )
                                                    ),
                                                    props.scheme
                                                )
                                                props.onReloadRequested?.()
                                            }}
                                        >
                                            <Important white>
                                                {action.button.label}
                                            </Important>
                                        </Button>
                                    )
                                )
                            ) : (
                                <Description>
                                    수행 가능한 동작이 없어요
                                </Description>
                            )}
                        </ActionToolbars>
                    )}
                </TableWrapper>
            </Vexile>
        </div>
    )
}
