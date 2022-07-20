import { number } from "@/fields/number"
import { singleRelation } from "@/fields/singleRelation"
import { text } from "@/fields/text"
import { NeoScheme, SLUG } from "@/types"
import {
    DELETE_SELECTED_RECORDS_ACTION,
    NEO_RECORD_BASE_FIELDS,
} from "../common"
import { ModifyStock } from "./panels"

export const NEO_PRODUCT: NeoScheme = {
    name: "상품",
    slug: SLUG.product,
    computedFields: {
        stock: {
            name: "재고",
        },
    },
    selectActions: [DELETE_SELECTED_RECORDS_ACTION],
    panelComponents: [ModifyStock],
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        systemId: text({
            displayName: "관리 번호",
            autoGenerative: true,
            readOnly: true,
            invisibleInTable: true,
            searchable: true,
            isUnique: true,
        }),
        name: text({
            displayName: "상품명",
            required: true,
            searchable: true,
            isUnique: true,
        }),
        barcode: text({
            displayName: "바코드 번호",
            required: true,
            searchable: true,
            isUnique: true,
            monospace: true,
        }),
        sellingPrice: number({
            displayName: "판매단가",
            required: true,
        }),
        purchaseCost: number({
            displayName: "매입단가",
            required: true,
        }),
        Category: singleRelation({
            displayName: "분류",
            targetTable: SLUG.category,
            nameField: "name",
            searchable: true,
        }),
    },
}
