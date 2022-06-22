import { Scheme, SLUG } from "@/types";
import { RECORD_BASE_FIELDS } from "./common";

export const PRODUCT_IN_OUT_LOG_SCHEME: Scheme = {
    displayName: "입출고 기록",
    tableName: SLUG.productInOutLog,
    fields: {
        ...RECORD_BASE_FIELDS,
        Product: {
            displayName: "상품",
            typeOption: {
                type: "relation-single",
                target: SLUG.product,
                displayNameField: "name",
            },
            required: true,
        },
        delta: {
            displayName: "변화량",
            typeOption: {
                type: "number",
            },
            required: true,
        },
        message: {
            displayName: "메모",
            typeOption: {
                type: "string",
            },
            required: false,
        },
        type: {
            displayName: "종류",
            typeOption: {
                type: "string",
            },
            required: true,
        },
        unitCost: {
            displayName: "입출고 단가",
            typeOption: {
                type: "number",
            },
            required: true,
        },
        systemId: {
            displayName: "내부관리번호",
            typeOption: {
                type: "string",
            },
            required: true,
            autoGenerative: true,
            readOnly: true,
            invisibleInTable: true,
        },
        StoreProducts: {
            displayName: "입고 이력",
            typeOption: {
                type: "relation-single",
                target: SLUG.storeProducts,
                displayNameField: "title",
            },
            required: false,
        },
        Transaction: {
            displayName: "구매 내역",
            typeOption: {
                type: "relation-single",
                target: SLUG.transaction,
                displayNameField: "id",
            },
            required: false,
        },
    }
}