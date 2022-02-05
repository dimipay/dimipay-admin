import { table } from "@/functions"
import { Scheme, TableRecord } from "@/types"

export const DELETE_SELECTED_RECORDS = async (
    selectedRecords: TableRecord[],
    scheme: Scheme
) => {
    const ids = selectedRecords.map((e) => e.id)
    // console.log(table[scheme.slug].delete({ ids }))
}
