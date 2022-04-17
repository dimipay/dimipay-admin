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
