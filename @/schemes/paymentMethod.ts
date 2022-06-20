import { Scheme, SLUG } from "@/types"
import { DELETE_SELECTED_RECORDS_ACTION, RECORD_BASE_FIELDS } from "./common"

export const PAYMENT_METHOD_SCHEME: Scheme = {
    displayName: "결제수단",
    softDelete: true,
    fields: {
        ...RECORD_BASE_FIELDS,
        systemId: {
            displayName: "관리 번호",
            autoGenerative: true,
            readOnly: true,
            invisibleInTable: true,
            typeOption: {
                type: "string",
            },
        },
        type: {
            displayName: "유형",
            required: true,
            typeOption: {
                type: "string",
            },
        },
        color: {
            displayName: "색상",
            typeOption: {
                type: "string",
            },
        },
        name: {
            displayName: "이름",
            typeOption: {
                type: "string",
            },
        },
        User: {
            displayName: "소유자",
            typeOption: {
                type: "relation-single",
                target: SLUG.user,
                displayNameField: "name",
            },
        },
    },
    tableName: SLUG.paymentMethod,
    actions: [DELETE_SELECTED_RECORDS_ACTION],
}
