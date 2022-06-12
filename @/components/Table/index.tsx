import React, { useEffect, useState } from "react"

import { Scheme, TableRecord, ToolbarAction } from "@/types"
import { Description, Important, Regular } from "@/typo"

import { ActionToolbars, HeaderCell, TableContent, TableWrapper } from "./style"
import { ActionableHeaderCell, Row } from "./partial"
import { Button } from ".."
import { Vexile } from "@haechi/flexile"
import { useInView } from "react-intersection-observer"

export const Table: React.FC<{
    scheme: Scheme
    records: TableRecord[]
    onReloadRequested(): void
    addFilter(key: string): void
    onReachEnd(): void
}> = ({ records: data, ...props }) => {
    const [selectedRecordIds, setSelectedRecordIds] = React.useState<string[]>(
        []
    )

    const [sort, setSort] = useState<string | null>(null)
    const [ref, inView] = useInView()

    useEffect(() => {
        if (inView) props.onReachEnd()
    }, [inView])

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
            ref={ref}
        >
            <Vexile gap={4} filly>
                <TableWrapper fillx filly scrollx y="space">
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
                                        !field.invisibleInTable && (
                                            <ActionableHeaderCell
                                                key={key}
                                                onFilter={() =>
                                                    props.addFilter(key)
                                                }
                                                onSort={() => setSort(key)}
                                            >
                                                {field?.displayName || key}
                                            </ActionableHeaderCell>
                                        )
                                )}
                                {props.scheme.computedFields &&
                                    Object.entries(
                                        props.scheme.computedFields
                                    ).map(([key, field]) => (
                                        <ActionableHeaderCell
                                            key={key}
                                            onFilter={() =>
                                                props.addFilter(key)
                                            }
                                            onSort={() => setSort(key)}
                                        >
                                            {field.displayName}
                                        </ActionableHeaderCell>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <Row
                                    key={row.id}
                                    ref={index === data.length - 5 ? ref : null}
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
                            {props.scheme.actions?.length ? (
                                props.scheme.actions?.map(
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
                                                props.onReloadRequested()
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
