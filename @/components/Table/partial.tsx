import { subContentAtom } from "@/coil"
import { DataValue, Field, Scheme, TableRecord } from "@/types"
import { Regular } from "@/typo"
import React from "react"
import { useSetRecoilState } from "recoil"
import { RecordEditer } from ".."
import { Cell } from "./style"

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

export const Row: React.FC<{
    selected: boolean
    onCheckboxClicked: (selected: boolean) => void
    onReloadRequested: () => void
    row: TableRecord
    scheme: Scheme
}> = ({ row, ...props }) => {
    const setSubContent = useSetRecoilState(subContentAtom)
    return (
        <tr
            key={row.id}
            onClick={() =>
                setSubContent({
                    element: (
                        <RecordEditer
                            onReloadRequested={props.onReloadRequested}
                            data={row}
                            scheme={props.scheme}
                        />
                    ),
                    name: props.scheme.name + " 상세",
                })
            }
        >
            <Cell>
                <input
                    type="checkbox"
                    checked={props.selected}
                    onClick={(e) => {
                        props.onCheckboxClicked(props.selected)
                        e.stopPropagation()
                    }}
                />
            </Cell>
            {Object.keys(row).map(
                (key) =>
                    key in props.scheme?.fields && (
                        <Cell key={key}>
                            <Regular>
                                {getFieldValue(
                                    props.scheme.fields[key],
                                    row[key]
                                )}
                            </Regular>
                        </Cell>
                    )
            )}
        </tr>
    )
}
