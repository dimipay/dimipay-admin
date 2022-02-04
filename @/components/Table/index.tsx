import { subContentAtom } from "@/coil"
import { DataValue, Field, Scheme } from "@/types"
import { PageHeader, Regular } from "@/typo"
import React from "react"
import { useRecoilState } from "recoil"
import { RecordEditer } from ".."
import { Cell, HeaderCell, TableContent, TableWrapper } from "./style"

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
    data: ({ id: number } & Record<string, DataValue>)[]
}> = ({ data, scheme }) => {
    const setSubContent = useRecoilState(subContentAtom)[1]
    console.log(scheme.fields)
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
