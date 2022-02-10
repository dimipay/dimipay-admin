// model Category {
//     id        String    @id
//     createdAt DateTime  @default(now())
//     updatedAt DateTime
//     name      String
//     color     String
//     Product   Product[]
// }

import { Scheme, SLUG } from "@/types"
import { RECORD_BASE_FIELDS } from "./common"

export const CATEGORY_SCHEME: Scheme = {
    name: "분류",
    tableName: SLUG.category,
    fields: {
        ...RECORD_BASE_FIELDS,
        name: {
            additional: {
                type: "string",
            },
            display: "이름",
            required: true,
        },
        color: {
            additional: {
                type: "string",
                pattern: "color",
            },
            display: "표시 색",
            description: "관리자 페이지에서 상품 페이지에 표시될 색상입니다",
        },
    },
}
