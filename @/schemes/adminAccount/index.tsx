// import { prisma } from "@/storage"
import { Scheme, SLUG } from "@/types"
import bcrypt from "bcryptjs"

import { RECORD_BASE_FIELDS } from "../common"
import { ResetPassword } from "./ResetPassword"

// prisma.adminAccount.update({
//     where: {
//         id: 0,
//     },
//     data: {
//         relatedUserSid: "",
//     },
// })

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
        User: {
            typeOption: {
                type: "relation-single",
                displayNameField: "name",
                target: SLUG.user,
                flattenField: "relatedUserSid",
            },
            displayName: "연결된 사용자",
            required: false,
        },
        hashedPassword: {
            displayName: "비밀번호",
            required: true,
            invisibleInTable: true,
            autoGenerative: true,
            typeOption: {
                type: "password",
            },
            async saveWithComputed(password) {
                const hash = bcrypt.hashSync(password as string, 10)
                console.log("SHIT", hash)
                return hash
            },
            async autoGenerate(record) {
                const hash = bcrypt.hashSync(record.username as string, 10)
                console.log("SHIT, ", hash)
                return hash
            },
            description:
                "초기 비밀번호는 아이디와 동일합니다. 계정 생성 후에 꼭 수정해주세요.",
        },
    },
    panelComponents: [ResetPassword],
}
