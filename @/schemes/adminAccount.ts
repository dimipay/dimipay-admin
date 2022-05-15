import { Scheme, SLUG } from "@/types"
import { RECORD_BASE_FIELDS } from "./common"

export const ADMIN_ACCOUNT_SCHEME: Scheme = {
    displayName: "관리자 계정",
    tableName: SLUG.adminAccount,
    fields: {
        ...RECORD_BASE_FIELDS,
        username: {
            typeOption: {
                type: "string",
            },
            displayName: "아이디",
            required: true,
        },
        relatedUserSystemUid: {
            typeOption: {
                type: "string",
            },
            displayName: "사용자 UID",
            required: false,
        },
    },
}
