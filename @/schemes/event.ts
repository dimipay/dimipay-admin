import { date } from "@/fields/date"
import { text } from "@/fields/text"
import { NeoScheme, SLUG } from "@/types"
import {
    DELETE_SELECTED_RECORDS_ACTION,
    NEO_RECORD_BASE_FIELDS,
} from "./common"

export const NEO_EVENT_SCHEME: NeoScheme = {
    name: "이벤트",
    slug: SLUG.event,
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        title: text({
            displayName: "제목",
            required: true,
            isUnique: true,
        }),
        description: text({
            displayName: "설명",
            required: true,
            isUnique: true,
        }),
        url: text({
            displayName: "이벤트 설명 페이지 주소",
            required: true,
            placeholder: "https://...",
            isUnique: true,
        }),
        endsAt: date({
            displayName: "종료일",
            required: false,
        }),
        startsAt: date({
            displayName: "시작일",
            required: false,
        }),
    },
    selectActions: [DELETE_SELECTED_RECORDS_ACTION],
}
