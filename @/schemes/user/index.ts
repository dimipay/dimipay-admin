import { Scheme, SLUG, TableRecord } from "@/types"
import { User } from "@prisma/client"
import { DELETE_SELECTED_RECORDS_ACTION, RECORD_BASE_FIELDS } from "../common"

export const USER_SCHEME: Scheme = {
    displayName: "사용자",
    tableName: SLUG.user,
    isUUIDPk: true,
    fields: {
        ...RECORD_BASE_FIELDS,
        systemId: {
            displayName: "관리 번호",
            autoGenerative: true,
            readOnly: true,
            typeOption: {
                type: "string",
            },
        },
        accountName: {
            displayName: "계정 이름",
            typeOption: {
                type: "string",
            },
        },
        name: {
            displayName: "이름",
            typeOption: {
                type: "string",
            },
        },
        profileImage: {
            displayName: "프로필 이미지",
            typeOption: {
                type: "string",
            },
            required: false,
        },
        phoneNumber: {
            displayName: "전화번호",
            typeOption: {
                type: "string",
            },
            required: false,
        },
        isTeacher: {
            displayName: "교사 여부",
            typeOption: {
                type: "boolean",
            },
            required: false,
        },
        isDisabled: {
            displayName: "거래 중지 여부",
            typeOption: {
                type: "boolean",
            },
        },
    },
    actions: [
        DELETE_SELECTED_RECORDS_ACTION,
        {
            button: {
                color: "accent",
                label: "거래 중지",
            },
            func(selectedRecords: TableRecord[]) {
                alert(
                    (selectedRecords as unknown as User[])
                        .map((e) => e.accountName)
                        .join(",") + "라네요. 글 내려주세요."
                )
            },
        },
    ],
    panelComponents: [],
}
