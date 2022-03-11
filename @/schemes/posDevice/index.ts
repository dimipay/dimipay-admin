import { Scheme, SLUG } from "@/types"
import { DELETE_SELECTED_RECORDS_ACTION } from "../common"
import { CreatePasscode } from "./panels"

export const POS_DEVICE_SCHEME: Scheme = {
    name: "결제 단말기",
    tableName: SLUG.posDevice,
    fields: {
        id: {
            display: "고유번호",
            required: true,
            autoGenerative: true,
            readOnly: true,
            additional: {
                type: "string",
            },
        },
        name: {
            display: "이름",
            required: true,
            additional: {
                type: "string",
            },
        },
        disabled: {
            display: "결제 중지 여부",
            additional: {
                type: "boolean",
                default: false,
            },
        },
    },
    panelComponents: [CreatePasscode],
    actions: [DELETE_SELECTED_RECORDS_ACTION],
}
