import { singleRelation } from "@/fields/singleRelation"
import { AdminAccount } from "@prisma/client"
import { NeoScheme, SLUG } from "@/types"
import { text } from "@/fields/text"
import bcrypt from "bcryptjs"

import {
    DELETE_SELECTED_RECORDS_ACTION,
    NEO_RECORD_BASE_FIELDS,
} from "../common"
import { ResetPassword } from "./ResetPassword"

export const NEO_ADMIN_ACCOUNT: NeoScheme = {
    name: "관리자 계정",
    slug: SLUG.adminAccount,
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        username: text({
            displayName: "아이디",
            required: true,
            searchable: true,
        }),
        hashedPassword: text({
            displayName: "비밀번호",
            required: true,
            invisibleInTable: true,
            autoGenerative: true,
            format: {
                beforeSave(value, record, isUpdate?) {
                    if (value) return bcrypt.hashSync(value, 10)
                    else if ((record as AdminAccount).username) {
                        return bcrypt.hashSync(
                            (record as AdminAccount).username,
                            10
                        )
                    }
                },
            },
        }),
        User: singleRelation({
            displayName: "연결된 사용자",
            targetTable: SLUG.user,
            nameField: "name",
            searchable: true,
        }),
        AdminRole: singleRelation({
            displayName: "권한",
            targetTable: SLUG.adminRole,
            nameField: "name",
            searchable: true,
        }),
    },
    panelComponents: [ResetPassword],
    selectActions: [DELETE_SELECTED_RECORDS_ACTION],
}
