import { text } from "@/fields/text"
import { NeoScheme, SLUG } from "@/types"
import {
    DELETE_SELECTED_RECORDS_ACTION,
    NEO_RECORD_BASE_FIELDS,
} from "../common"
import { CreatePasscode } from "./panels"

export const NEO_POS_DEVICE_SCHEME: NeoScheme = {
    name: "결제 단말기",
    softDelete: true,
    slug: SLUG.posDevice,
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        name: text({
            displayName: "이름",
            required: true,
            isUnique: true,
        }),
        systemId: text({
            displayName: "내부관리번호",
            required: true,
            autoGenerative: true,
            readOnly: true,
            invisibleInTable: true,
            isUnique: true,
        }),
    },
    panelComponents: [CreatePasscode],
    selectActions: [DELETE_SELECTED_RECORDS_ACTION],
}
