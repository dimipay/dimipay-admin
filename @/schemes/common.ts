import { table } from "@/functions"
import { Field, Scheme, TableRecord, ToolbarAction } from "@/types"
import { Product } from "@prisma/client"
import { toast } from "react-toastify"

export const DELETE_SELECTED_RECORDS_ACTION: ToolbarAction = {
    button: {
        color: "accent",
        label: "삭제",
    },
    func: async (selectedRecords: TableRecord[], scheme: Scheme) => {
        const ids = selectedRecords.map((e) => e.id)
        const res = await table[scheme.tableName].DELETE({ ids })
        toast.success(
            `${(selectedRecords as unknown as Product[]).map(e => e?.name || (e?.id + "번")).join(", ").이가
            } 삭제되었습니다`,
        )
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
