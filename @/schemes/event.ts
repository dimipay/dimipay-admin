import { Scheme, SLUG } from "@/types"
import { RECORD_BASE_FIELDS } from "./common"

export const EVENT: Scheme = {
    displayName: "이벤트",
    tableName: SLUG.event,
    fields: {
        ...RECORD_BASE_FIELDS,
        title: {
            displayName: "제목",
            typeOption: {
                type: "string",
            },
            required: true,
        },
        description: {
            displayName: "설명",
            typeOption: {
                type: "string",
            },
            required: true,
        },
        url: {
            displayName: "이벤트 설명 페이지 URL",
            typeOption: {
                type: "string",
            },
            required: true,
            placeholder: "페이지 주소를 입력해주세요",
        },
        endsAt: {
            displayName: "종료일",
            typeOption: {
                type: "date",
            },
        },
        startsAt: {
            displayName: "시작일",
            typeOption: {
                type: "date",
            },
            required: false,
        },
    },
}
