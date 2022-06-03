import { Scheme, SLUG, TableRecord } from "@/types"
import { User } from "@prisma/client"
import { DELETE_SELECTED_RECORDS_ACTION, RECORD_BASE_FIELDS } from "../common"

export const USER_SCHEME: Scheme = {
    displayName: "사용자",
    tableName: SLUG.user,
    fields: {
        ...RECORD_BASE_FIELDS,
        systemId: {
            displayName: "교내관리번호",
            description:
                "학번이 아닌 중앙데이터베이스 관리용 번호입니다. 임의로 변경할 시 시스템에 오류가 발생할 수 있습니다.",
            required: true,
            validateFunc(data) {
                if (+(data as number) < 0)
                    return "교내관리번호는 0 이상이여야 합니다"
            },
            typeOption: {
                type: "string",
            },
        },
        accountName: {
            displayName: "ID",
            required: true,
            typeOption: {
                type: "string",
            },
            validateFunc(_data) {
                const data = _data as string

                if (data.length < 2) return "ID는 2글자 이상이여야 합니다"
                if (data.length > 20) return "ID는 20글자 이하이여야 합니다"

                if (!/^[a-zA-Z0-9!@#$%^&*()]+$/.test(data))
                    return "ID는 영문과 숫자만, 특수문자 사용할 수 있습니다"
            },
        },
        profileImage: {
            displayName: "프로필 이미지",
            invisibleInTable: true,
            typeOption: {
                type: "string",
            },
            required: true,
        },
        isTeacher: {
            displayName: "교사여부",
            required: true,
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
