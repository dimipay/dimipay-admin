import { Regular } from "@/typo"
import React from "react"
import { Cell, HeaderCell, TableContent, TableWrapper } from "./style"

export const Table: React.FC<{
    data: unknown[]
}> = ({ data }) => (
    <TableWrapper fillx scrollx>
        <TableContent>
            <thead>
                <tr
                    style={{
                        opacity: 0.4,
                    }}
                >
                    {Object.keys(data[0]).map((key) => (
                        <HeaderCell key={key}>
                            <Regular>{key}</Regular>
                        </HeaderCell>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        {Object.keys(row).map((key) => (
                            <Cell key={key}>
                                <Regular>{row[key]}</Regular>
                            </Cell>
                        ))}
                    </tr>
                ))}
            </tbody>
        </TableContent>
    </TableWrapper>
)
