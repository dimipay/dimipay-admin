import { Scheme, SLUG } from "@/types"
import { prisma } from "@prisma/client"
import { RECORD_BASE_FIELDS } from "./common"

export const DISCOUNT_POLICY: Scheme = {
    displayName: "할인 정책",
    tableName: SLUG.discountPolicy,
    fields: {
        ...RECORD_BASE_FIELDS,
        percentRate: {
            displayName: "할인율 (%)",
            typeOption: {
                type: "number",
                default: 0,
                suffix: "%",
            },
            required: false,
            description: "최소 1%부터 99%까지 설정할 수 있습니다",
        },
        fixedPrice: {
            displayName: "정가 할인",
            typeOption: {
                type: "number",
                default: 0,
                suffix: "원",
            },
            required: false,
        },
        eventId: {
            displayName: "연계 이벤트",
            // typeOption: {
            //     type: "relation-single",
            //     target: SLUG.
            // }
            typeOption: {
                type: "string",
            },
        },
    },
}
