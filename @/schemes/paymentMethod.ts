import { singleRelation } from "@/fields/singleRelation"
import { text } from "@/fields/text"
import { NeoScheme, SLUG } from "@/types"
import {
    DELETE_SELECTED_RECORDS_ACTION,
    NEO_RECORD_BASE_FIELDS,
} from "./common"

export const NEO_PAYMENT_METHOD_SCHEME: NeoScheme = {
    name: "결제수단",
    slug: SLUG.paymentMethod,
    softDelete: true,
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        systemId: text({
            displayName: "관리 번호",
            autoGenerative: true,
            readOnly: true,
            invisibleInTable: true,
        }),
        type: text({
            displayName: "유형",
            required: true,
        }),
        color: text({
            displayName: "색상",
        }),
        name: text({
            displayName: "이름",
            required: true,
        }),
        User: singleRelation({
            displayName: "소유자",
            targetTable: SLUG.user,
            nameField: "name",
        }),
    },
    selectActions: [DELETE_SELECTED_RECORDS_ACTION],
}
