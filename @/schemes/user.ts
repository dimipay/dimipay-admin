import { Scheme, SLUG, TableRecord } from "@/types"
import { Role, User } from "@prisma/client"
import { DELETE_SELECTED_RECORDS_ACTION, RECORD_BASE_FIELDS } from "./common"

export const USER_SCHEME: Scheme = {
    name: "사용자",
    tableName: SLUG.user,
    fields: {
        ...RECORD_BASE_FIELDS,
        studentUid: {
            display: "교내관리번호",
            description:
                "학번이 아닌 중앙데이터베이스 관리용 번호입니다. 임의로 변경할 시 시스템에 오류가 발생할 수 있습니다.",
            required: true,
            validateFunc(data) {
                if (data < 0) return "교내관리번호는 0 이상이여야 합니다"
            },
            additional: {
                type: "string",
            },
        },
        accountName: {
            display: "ID",
            required: true,
            additional: {
                type: "string",
            },
            validateFunc(data: string) {
                if (data.length < 2) return "ID는 2글자 이상이여야 합니다"

                if (data.length > 20) return "ID는 20글자 이하이여야 합니다"

                if (!/^[a-zA-Z0-9!@#$%^&*()]+$/.test(data))
                    return "ID는 영문과 숫자만, 특수문자 사용할 수 있습니다"
            },
        },
        profileImage: {
            display: "프로필 이미지",
            invisibleInTable: true,
            additional: {
                type: "string",
            },
            required: true,
        },
        roles: {
            display: "유형",
            required: true,
            validateFunc(data: string[]) {
                if (data.includes("S") && data.includes("T"))
                    return "학생과 교사 권한을 동시에 부여할 수 없습니다"
            },
            additional: {
                type: "multiple",
                options: [
                    {
                        label: Role.USER,
                        color: "#E54444",
                    },
                    {
                        label: Role.TEACHER,
                        color: "#E5E544",
                    },
                    {
                        label: Role.ADMIN,
                        color: "#44A2E5",
                    },
                ],
                map: {
                    [Role.USER]: "사용자",
                    [Role.TEACHER]: "교사",
                    [Role.ADMIN]: "관리자",
                },
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
                    (selectedRecords as User[])
                        .map((e) => e.accountName)
                        .join(",") + "라네요. 글 내려주세요."
                )
            },
        },
    ],
}
