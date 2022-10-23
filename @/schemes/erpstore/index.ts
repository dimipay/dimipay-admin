import { number } from "@/fields/number"
import { singleRelation } from "@/fields/singleRelation"
import { text } from "@/fields/text"
import { NeoScheme, SLUG } from "@/types"
import {
    DELETE_SELECTED_RECORDS_ACTION,
    NEO_RECORD_BASE_FIELDS,
} from "../common"

export const NEO_ERP: NeoScheme = {
    name: "상품",
    slug: SLUG.product,
    computedFields: {},
    selectActions: [DELETE_SELECTED_RECORDS_ACTION],
    panelComponents: [],
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        PROD_CD: text({
            displayName: "바코드",
            required: true,
            searchable: true,
            isUnique: true,
        }),
        PROD_DES: text({
            displayName: "품목명",
            required: true,
            searchable: true,
        }),
        BAL_QTY: number({
            displayName: "재고수량",
            required: true,
            searchable: true,
        }),
    },
}
