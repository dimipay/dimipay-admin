import { table } from "@/functions"
import { Field, Scheme, TableRecord, ToolbarAction } from "@/types"

export const DELETE_SELECTED_RECORDS_ACTION: ToolbarAction = {
    button: {
        color: "accent",
        label: "삭제",
    },
    func: async (selectedRecords: TableRecord[], scheme: Scheme) => {
        const ids = selectedRecords.map((e) => e.id)
        const res = await table[scheme.tableName].DELETE({ ids })
    },
}

export const RECORD_BASE_FIELDS: Record<string, Field> = {
    id: {
        displayName: "ID",
        readOnly: true,
        autoGenerative: true,
        typeOption: {
            type: "string",
        },
        invisibleInTable: true,
    },
    createdAt: {
        displayName: "생성일",
        readOnly: true,
        autoGenerative: true,
        typeOption: {
            type: "date",
        },
        invisibleInTable: true,
    },
    updatedAt: {
        displayName: "마지막 정보 수정",
        readOnly: true,
        autoGenerative: true,
        typeOption: {
            type: "date",
        },
        invisibleInTable: true,
    },
}
