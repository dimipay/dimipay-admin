import { text } from "@/fields/text"
import { NeoScheme, SLUG } from "@/types"
import {
    DELETE_SELECTED_RECORDS_ACTION,
    NEO_RECORD_BASE_FIELDS,
} from "../common"

export const NEO_USER: NeoScheme = {
    name: "사용자",
    slug: SLUG.user,
    selectActions: [DELETE_SELECTED_RECORDS_ACTION],
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
        accountName: text({
            displayName: "ID",
            required: true,
            searchable: true,
            isUnique: true,
        }),
        name: text({
            displayName: "이름",
            required: true,
            searchable: true,
        }),
        profileImage: text({
            displayName: "프로필 이미지",
        }),
        phoneNumber: text({
            displayName: "전화번호",
            placeholder: "010-1234-5678",
            searchable: true,
            isUnique: true,
        }),
    },
}
