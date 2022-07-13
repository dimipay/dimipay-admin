import { multipleRelation } from "@/fields/multipleRelation"
import { number } from "@/fields/number"
import { singleRelation } from "@/fields/singleRelation"
import { text } from "@/fields/text"
import { NeoScheme, SLUG } from "@/types"
import {
    DELETE_SELECTED_RECORDS_ACTION,
    NEO_RECORD_BASE_FIELDS,
} from "./common"

export const NEO_PRODUCT_IN_OUT_LOG_SCHEME: NeoScheme = {
    name: "입출고 기록",
    slug: SLUG.productInOutLog,
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        Product: singleRelation({
            displayName: "상품",
            targetTable: SLUG.product,
            nameField: "name",
        }),
        delta: number({
            displayName: "변화량",
            required: true,
        }),
        message: text({
            displayName: "메모",
        }),
        type: text({
            displayName: "종류",
            required: true,
        }),
        unitCost: number({
            displayName: "입출고 단가",
            required: true,
        }),
        systemId: text({
            displayName: "내부관리번호",
            required: true,
            autoGenerative: true,
            readOnly: true,
            invisibleInTable: true,
        }),
        StoreProducts: singleRelation({
            displayName: "연결된 입고 이력",
            targetTable: SLUG.storeProducts,
            nameField: "title",
        }),
        Transaction: singleRelation({
            displayName: "구매 내역",
            targetTable: SLUG.transaction,
            nameField: "id",
        }),
    },
    selectActions: [DELETE_SELECTED_RECORDS_ACTION],
}
