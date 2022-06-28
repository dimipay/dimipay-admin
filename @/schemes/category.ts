import { text } from "@/fields/text"
import { NeoScheme, SLUG } from "@/types"
import { DELETE_SELECTED_RECORDS_ACTION, NEO_RECORD_BASE_FIELDS } from "./common"


export const NEO_CATEGORY_SCHEME: NeoScheme = {
    name: "분류",
    slug: SLUG.category,
    softDelete: true,
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        name: text({
            displayName: "이름",
            required: true,
        }),
        color: text({
            displayName: "표시 색",
            required: true,
            description: "관리자 페이지에서 상품 페이지에 표시될 색상입니다",
        }),
    },
    selectActions: [DELETE_SELECTED_RECORDS_ACTION],
}