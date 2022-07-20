import { multipleRelation } from "@/fields/multipleRelation"
import { number } from "@/fields/number"
import { singleRelation } from "@/fields/singleRelation"
import { NeoScheme, SLUG } from "@/types"
import {
    DELETE_SELECTED_RECORDS_ACTION,
    NEO_RECORD_BASE_FIELDS,
} from "./common"

export const NEO_DISCOUNT_POLICY: NeoScheme = {
    name: "할인 정책",
    slug: SLUG.discountPolicy,
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        percentRate: number({
            displayName: "할인율 (%)",
            validate: {
                func: async (value: number) => {
                    if (value < 0 || value > 100) {
                        return "할인율은 0~100 사이의 숫자여야 합니다"
                    }
                },
            },
        }),
        fixedPrice: number({
            displayName: "정가 할인",
        }),
        Event: singleRelation({
            displayName: "연계 이벤트",
            targetTable: SLUG.event,
            isUnique: true,
            nameField: "title",
        }),
        targetCategory: multipleRelation({
            displayName: "할인 카테고리",
            targetTable: SLUG.category,
            nameField: "name",
        }),
    },
    selectActions: [DELETE_SELECTED_RECORDS_ACTION],
}
