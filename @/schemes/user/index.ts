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
            displayName: "내부 관리 번호",
            description:
                "내부적으로 사용자를 식별할 때 사용하는 번호입니다. 임의로 변경할 시 시스템이 불안정해질 수 있습니다.",
            typeOption: {
                type: "string",
            },
            validateFunc(value) {
                if (isNaN(+(value as string))) {
                    return "숫자만 입력해야 해요"
                }

                if ((value as string).length !== 4) {
                    return "내부 관리 번호는 4자리입니다"
                }
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
