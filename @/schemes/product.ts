import { Scheme, SLUG } from "@/types"
import { DELETE_SELECTED_RECORDS_ACTION, RECORD_BASE_FIELDS } from "./common"

export const PRODUCT_SCHEME: Scheme = {
    name: "상품",
    tableName: SLUG.product,
    fields: {
        ...RECORD_BASE_FIELDS,
        name: {
            display: "상품명",
            required: true,
            additional: {
                type: "string",
            },
        },
        barcode: {
            display: "바코드 번호",
            description: "없으면 공란",
            additional: {
                type: "string",
            },
        },
        price: {
            display: "판매단가",
            required: true,
            additional: {
                type: "number",
                suffix: "원",
            },
            description: "할인이 적용되지 않은 기준 판매단가",
        },
        Category: {
            display: "분류",
            required: true,
            additional: {
                type: "relation-single",
                target: SLUG.category,
            },
        },
        inventory: {
            display: "현재 재고",
            required: true,
            additional: {
                type: "number",
            },
        },
    },
    actions: [DELETE_SELECTED_RECORDS_ACTION],
}
