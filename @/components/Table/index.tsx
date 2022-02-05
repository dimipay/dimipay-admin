import { useRecoilState } from "recoil"
import React from "react"

import { DataValue, Field, Scheme, TableRecord } from "@/types"
import { subContentAtom } from "@/coil"
import { Regular } from "@/typo"

import { Cell, HeaderCell, TableContent, TableWrapper } from "./style"
import { RecordEditer } from ".."
import { Row } from "./partial"

export const Table: React.FC<{
    scheme: Scheme
    records: TableRecord[]
    onReloadRequested(): void
}> = ({ records: data, scheme, onReloadRequested }) => {
    const [selectedRecordIds, setSelectedRecordIds] = React.useState<number[]>(
        []
    )

    return (
        <TableWrapper fillx scrollx>
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
        </TableWrapper>
    )
}
