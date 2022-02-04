import { SchemeGroup } from "./types"

export const assert = (
    name: string,
    content: string,
    isServersideOnly: boolean
) => {
    if (!content && !isServersideOnly)
        throw new Error(`Cannot find "${name}" in environment variables`)
    return content
}

export const JWT_SECRET = assert("JWT_SECRET", process.env.JWT_SECRET, true)

export const GROUPED_TABLES: SchemeGroup[] = [
    {
        groupName: "판매",
        content: [
            {
                name: "상품",
                tableName: "dimipay_admin_product",
                slug: "product",
            },
            {
                name: "사용자",
                tableName: "dimipay_users",
                slug: "user",
                fields: {
                    id: {
                        display: "#",
                        disabled: true,
                    },
                    student_id: {
                        display: "교내관리번호",
                        required: true,
                        validateFunc(data) {
                            if (data < 0)
                                return "교내관리번호는 0 이상이여야 합니다"
                        },
                    },
                    username: {
                        display: "ID",
                        required: true,
                        validateFunc(data: string) {
                            if (data.length < 2)
                                return "ID는 2글자 이상이여야 합니다"

                            if (data.length > 20)
                                return "ID는 20글자 이하이여야 합니다"

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
            },
        ],
    },
    {
        groupName: "관리",
        content: [
            {
                name: "상품",
                tableName: "dimipay_admin_product",
                slug: "product",
            },
            {
                name: "사용자",
                tableName: "dimipay_users",
                slug: "user",
            },
        ],
    },
]

export const TABLES = GROUPED_TABLES.map((group) => group.content).flat()
