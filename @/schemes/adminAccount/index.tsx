// import { prisma } from "@/storage"
import { multipleRelation } from "@/fields/multipleRelation"
import { singleRelation } from "@/fields/singleRelation"
import { text } from "@/fields/text"
import { SLUG } from "@/types"
import { AdminAccount } from "@prisma/client"
import bcrypt from "bcryptjs"

import { NEO_RECORD_BASE_FIELDS } from "../common"
import { NeoScheme } from "../user"
import { ResetPassword } from "./ResetPassword"

export const NEO_ADMIN_ACCOUNT: NeoScheme = {
    name: "관리자 계정",
    slug: SLUG.adminAccount,
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        username: text({
            displayName: "아이디",
            required: true,
        }),
        hashedPassword: text({
            displayName: "비밀번호",
            required: true,
            invisibleInTable: true,
            autoGenerative: true,
            format: {
                beforeSave(value, record, isUpdate?) {
                    if (isUpdate) return bcrypt.hashSync(value, 10)

                    return bcrypt.hashSync(
                        (record as AdminAccount).username,
                        10
                    )
                },
            },
        }),
        User: singleRelation({
            displayName: "연결된 사용자",
            targetTable: SLUG.user,
            nameField: "name",
        }),
    },
    panelComponents: [ResetPassword],
}
