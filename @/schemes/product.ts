import { Scheme, SLUG } from "@/types"
import { DELETE_SELECTED_RECORDS_ACTION, RECORD_BASE_FIELDS } from "./common"

export const PRODUCT_SCHEME: Scheme = {
    displayName: "상품",
    tableName: SLUG.product,
    isUUIDPk: true,
    fields: {
        ...RECORD_BASE_FIELDS,
        name: {
            displayName: "상품명",
            required: true,
            typeOption: {
                type: "string",
            },
        },
        barcode: {
            displayName: "바코드 번호",
            description: "없으면 공란",
            typeOption: {
                type: "string",
            },
        },
        price: {
            displayName: "판매단가",
            required: true,
            typeOption: {
                type: "number",
                suffix: "원",
            },
            description: "할인이 적용되지 않은 기준 판매단가",
        },
        category: {
            displayName: "분류",
            required: true,
            typeOption: {
                type: "relation-single",
                target: SLUG.category,
                displayNameField: "name",
            },
        },
        sellingStopped: {
            displayName: "판매 중지 여부",
            typeOption: {
                type: "boolean",
            },
        },
    },
    actions: [DELETE_SELECTED_RECORDS_ACTION],
}
