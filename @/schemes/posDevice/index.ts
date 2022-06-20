import { Scheme, SLUG } from "@/types"
import { DELETE_SELECTED_RECORDS_ACTION } from "../common"
import { CreatePasscode } from "./panels"

export const POS_DEVICE_SCHEME: Scheme = {
    displayName: "결제 단말기",
    tableName: SLUG.posDevice,
    isUUIDPk: true,
    softDelete: true,
    fields: {
        id: {
            displayName: "고유번호",
            required: true,
            autoGenerative: true,
            readOnly: true,
            typeOption: {
                type: "string",
            },
        },
        name: {
            displayName: "이름",
            required: true,
            typeOption: {
                type: "string",
            },
        },
        disabled: {
            displayName: "결제 중지 여부",
            typeOption: {
                type: "boolean",
                default: false,
            },
        },
    },
    panelComponents: [CreatePasscode],
    actions: [DELETE_SELECTED_RECORDS_ACTION],
}
