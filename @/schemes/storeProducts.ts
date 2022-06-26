import { date } from "@/fields/date";
import { multipleRelation } from "@/fields/multipleRelation";
import { singleRelation } from "@/fields/singleRelation";
import { text } from "@/fields/text";
import { SLUG } from "@/types";
import { NEO_RECORD_BASE_FIELDS } from "./common";
import { NeoScheme } from "./user";

export const NEO_STORE_PRODUCT: NeoScheme = {
    name: "상품 입고",
    slug: SLUG.storeProducts,
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        systemId: text({
            displayName: "내부관리번호",
            required: true,
            autoGenerative: true,
            readOnly: true,
            invisibleInTable: true,
        }),
        totalCost: text({
            displayName: "총 금액",
            required: true,

        }),
        storeDate: date({
            displayName: "입고 일자",
        }),
        title: text({
            displayName: "메모",
            required: true,
        }),
        AdminAccount: singleRelation({
            displayName: "입고자",
            targetTable: SLUG.adminAccount,
            nameField: "username",
        }),
        ProductInOutLog: multipleRelation({
            displayName: "연관 이력",
            targetTable: SLUG.productInOutLog,
            nameField: "id",
            invisibleInTable: true
        })
    }
}