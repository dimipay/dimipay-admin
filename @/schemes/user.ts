import { Scheme, SLUG, TableRecord } from "@/types"
import { dimipay_users } from "@prisma/client"
import { DELETE_SELECTED_RECORDS } from "./common"

export const USER_SCHEME: Scheme = {
    name: "사용자",
    tableName: SLUG.user,
    fields: {
        id: {
            display: "#",
            disabled: true,
        },
        student_id: {
            display: "교내관리번호",
            description:
                "학번이 아닌 중앙데이터베이스 관리용 번호입니다. 임의로 변경할 시 시스템에 오류가 발생할 수 있습니다.",
            required: true,
            validateFunc(data) {
                if (data < 0) return "교내관리번호는 0 이상이여야 합니다"
            },
        },
        username: {
            display: "ID",
            required: true,
            validateFunc(data: string) {
                if (data.length < 2) return "ID는 2글자 이상이여야 합니다"

                if (data.length > 20) return "ID는 20글자 이하이여야 합니다"

                if (!/^[a-zA-Z0-9!@#$%^&*()]+$/.test(data))
                    return "ID는 영문과 숫자만, 특수문자 사용할 수 있습니다"
            },
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
                        label: "S",
                        color: "#E54444",
                    },
                    {
                        label: "T",
                        color: "#E5E544",
                    },
                    {
                        label: "A",
                        color: "#44A2E5",
                    },
                ],
                map: {
                    S: "학생",
                    T: "교사",
                    A: "관리자",
                },
            },
        },
    },
    actions: [
        {
            button: {
                color: "accent",
                label: "삭제",
            },
            func: DELETE_SELECTED_RECORDS,
        },
        {
            button: {
                color: "accent",
                label: "거래 중지",
            },
            func(selectedRecords: TableRecord[]) {
                alert(
                    (selectedRecords as dimipay_users[])
                        .map((e) => e.username)
                        .join(",") + "라네요. 글 내려주세요."
                )
            },
        },
    ],
}
