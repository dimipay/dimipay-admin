import { Scheme, SLUG } from "@/types"
import bcrypt from "bcryptjs"

import { RECORD_BASE_FIELDS } from "../common"
import { ResetPassword } from "./ResetPassword"

export const ADMIN_ACCOUNT_SCHEME: Scheme = {
    displayName: "관리자 계정",
    tableName: SLUG.adminAccount,
    isUUIDPk: true,
    fields: {
        ...RECORD_BASE_FIELDS,
        username: {
            typeOption: {
                type: "string",
            },
            displayName: "아이디",
            required: true,
        },
        relatedUserId: {
            typeOption: {
                type: "string",
            },
            displayName: "사용자 ID",
            required: false,
        },
        hashedPassword: {
            displayName: "비밀번호",
            required: true,
            invisibleInTable: true,
            typeOption: {
                type: "password",
            },
            saveWithComputed(password) {
                return bcrypt.hashSync(password as string, 10)
            },
        },
    },
    panelComponents: [ResetPassword],
}
