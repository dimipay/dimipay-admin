import { date } from "@/fields/date"
import { text } from "@/fields/text"
import { table } from "@/functions"
import { NeoScheme, TableRecord, ToolbarAction } from "@/types"
import { Product } from "@prisma/client"
import { toast } from "react-toastify"

export const DELETE_SELECTED_RECORDS_ACTION: ToolbarAction = {
    button: {
        color: "accent",
        label: "삭제",
    },
    func: async (selectedRecords: TableRecord[], scheme: NeoScheme) => {
        const ids = selectedRecords.map(e => e.id)
        await table[scheme.slug].DELETE({ ids })
        toast.success(
            `${
                (selectedRecords as unknown as Product[])
                    .map(e => e?.name || e?.id + "번")
                    .join(", ").이가
            } 삭제되었습니다`,
        )
    },
}

export const NEO_RECORD_BASE_FIELDS = {
    id: text({
        displayName: "ID",
        readOnly: true,
        autoGenerative: true,
        isUnique: true,
    }),
    createdAt: date({
        displayName: "생성일",
        readOnly: true,
        autoGenerative: true,
    }),
    updatedAt: date({
        displayName: "수정일",
        readOnly: true,
        autoGenerative: true,
        invisibleInTable: true,
    }),
}
