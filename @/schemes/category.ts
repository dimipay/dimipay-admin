import { Scheme, SLUG } from "@/types"
import { DELETE_SELECTED_RECORDS_ACTION, RECORD_BASE_FIELDS } from "./common"

export const CATEGORY_SCHEME: Scheme = {
    displayName: "분류",
    tableName: SLUG.category,
    fields: {
        ...RECORD_BASE_FIELDS,
        name: {
            typeOption: {
                type: "string",
            },
            displayName: "이름",
            required: true,
        },
        color: {
            typeOption: {
                type: "color",
            },
            displayName: "표시 색",
            description: "관리자 페이지에서 상품 페이지에 표시될 색상입니다",
        },
    },
    actions: [DELETE_SELECTED_RECORDS_ACTION],
}
