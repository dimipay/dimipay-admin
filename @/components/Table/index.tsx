import { useRecoilState } from "recoil"
import React from "react"

import { DataValue, Field, Scheme, TableRecord } from "@/types"
import { subContentAtom } from "@/coil"
import { Regular } from "@/typo"

import { Cell, HeaderCell, TableContent, TableWrapper } from "./style"
import { RecordEditer } from ".."

const getFieldValue = (field: Field, value: DataValue) => {
    if (field.computed) return field.computed(value)

    if (
        value instanceof Array &&
        field.additional.type === "multiple" &&
        field.additional.map
    )
        return value
            .map(
                (v: string | number | boolean) =>
                    field.additional.map[v.toString()] || v
            )
            .join(", ")

    return value
}

export const Table: React.FC<{
    scheme: Scheme
    records: TableRecord[]
    onReloadRequested(): void
}> = ({ records: data, scheme, onReloadRequested }) => {
    const setSubContent = useRecoilState(subContentAtom)[1]

    return (
        <TableWrapper fillx scrollx>
            <TableContent>
                <thead>
                    <tr
                        style={{
                            opacity: 0.4,
                        }}
                    >
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
                        <tr
                            key={row.id}
                            onClick={() =>
                                setSubContent({
                                    element: (
                                        <RecordEditer
                                            onReloadRequested={
                                                onReloadRequested
                                            }
                                            data={row}
                                            scheme={scheme}
                                        />
                                    ),
                                    name: scheme.name + " 상세",
                                })
                            }
                        >
                            {Object.keys(row).map(
                                (key) =>
                                    key in scheme?.fields && (
                                        <Cell key={key}>
                                            <Regular>
                                                {getFieldValue(
                                                    scheme.fields[key],
                                                    row[key]
                                                )}
                                            </Regular>
                                        </Cell>
                                    )
                            )}
                        </tr>
                    ))}
                </tbody>
            </TableContent>
        </TableWrapper>
    )
}
