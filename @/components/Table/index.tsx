import { Scheme } from "@/types"
import { Regular } from "@/typo"
import React from "react"
import { Cell, HeaderCell, TableContent, TableWrapper } from "./style"

export const Table: React.FC<{
    scheme: Scheme
    data: ({ id: number } & Record<string, unknown>)[]
}> = ({ data, scheme }) => (
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
                                        {scheme?.fields?.[key]?.display || key}
                                    </Regular>
                                </HeaderCell>
                            )
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        {Object.keys(row).map(
                            (key) =>
                                key in scheme?.fields && (
                                    <Cell key={key}>
                                        <Regular>
                                            {scheme?.fields?.[key]?.computed?.(
                                                row[key]
                                            ) || row[key]}
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
