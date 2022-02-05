import React from "react"

import { Scheme, TableRecord } from "@/types"
import { Description, Important, Regular } from "@/typo"

import { ActionToolbars, HeaderCell, TableContent, TableWrapper } from "./style"
import { Row } from "./partial"
import { Button, DividerLine } from ".."

export const Table: React.FC<{
    scheme: Scheme
    records: TableRecord[]
    onReloadRequested(): void
}> = ({ records: data, scheme, onReloadRequested }) => {
    const [selectedRecordIds, setSelectedRecordIds] = React.useState<number[]>(
        []
    )

    return (
        <TableWrapper fillx filly scrollx y="space">
            <TableContent>
                <thead>
                    <tr
                        style={{
                            opacity: 0.4,
                        }}
                    >
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
                        {Object.keys(data[0]).map(
                            (key) =>
                                key in scheme?.fields && (
                                    <HeaderCell key={key}>
                                        <Regular>
                                            {scheme?.fields?.[key]?.display ||
                                                key}
                                        </Regular>
                                    </HeaderCell>
                                )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <Row
                            selected={selectedRecordIds.includes(row.id)}
                            onReloadRequested={onReloadRequested}
                            onCheckboxClicked={(selected) => {
                                if (selected)
                                    setSelectedRecordIds((prev) =>
                                        prev.filter((id) => id !== row.id)
                                    )
                                else
                                    setSelectedRecordIds((prev) => [
                                        ...prev,
                                        row.id,
                                    ])
                            }}
                            row={row}
                            scheme={scheme}
                        />
                    ))}
                </tbody>
            </TableContent>
            {selectedRecordIds.length !== 0 && (
                <ActionToolbars gap={2} padding={4}>
                    {scheme.actions.length ? (
                        scheme.actions?.map((action) => (
                            <Button
                                key={action.button.label}
                                onClick={async () => {
                                    await action.func(
                                        data.filter((d) =>
                                            selectedRecordIds.includes(d.id)
                                        ),
                                        scheme
                                    )
                                    onReloadRequested()
                                }}
                            >
                                <Important white>
                                    {action.button.label}
                                </Important>
                            </Button>
                        ))
                    ) : (
                        <Description>수행 가능한 동작이 없어요</Description>
                    )}
                </ActionToolbars>
            )}
        </TableWrapper>
    )
}
