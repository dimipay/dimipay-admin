import { table } from "@/functions"
import { Scheme, TableRecord, ToolbarAction } from "@/types"

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
