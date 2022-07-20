import { multipleRelation } from "@/fields/multipleRelation"
import { number } from "@/fields/number"
import { singleRelation } from "@/fields/singleRelation"
import { text } from "@/fields/text"
import { NeoScheme, SLUG } from "@/types"
import {
    DELETE_SELECTED_RECORDS_ACTION,
    NEO_RECORD_BASE_FIELDS,
} from "./common"

export const NEO_TRANSACTION_SCHEME: NeoScheme = {
    name: "판매 기록",
    slug: SLUG.transaction,
    defaultSort: {
        field: "createdAt",
        order: "321",
    },
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        billingId: text({
            displayName: "PG 결제 ID",
            invisibleInTable: true,
            isUnique: true,
            searchable: true,
        }),
        totalPrice: number({
            displayName: "금액",
            isUnique: true,
        }),
        status: text({
            displayName: "상태",
        }),
        statusText: text({
            displayName: "상태 메시지",
            searchable: true,
        }),
        transactionMethod: text({
            displayName: "인증 수단",
            invisibleInTable: true,
        }),
        systemId: text({
            displayName: "내부관리번호",
            readOnly: true,
            invisibleInTable: true,
            autoGenerative: true,
            isUnique: true,
            searchable: true,
        }),
        purchaseType: text({
            displayName: "거래 유형",
        }),
        purchaseDetail: text({
            displayName: "거래 상세",
            invisibleInTable: true,
        }),
        PosDevice: singleRelation({
            displayName: "결제 단말기",
            targetTable: SLUG.posDevice,
            nameField: "name",
        }),
        PaymentMethod: singleRelation({
            displayName: "결제 수단",
            targetTable: SLUG.paymentMethod,
            nameField: "name",
            invisibleInTable: true,
            searchable: true,
        }),
        User: singleRelation({
            displayName: "사용자",
            targetTable: SLUG.user,
            nameField: "name",
            searchable: true,
        }),
        products: multipleRelation({
            displayName: "상품",
            targetTable: SLUG.product,
            nameField: "name",
            searchable: true,
        }),
    },
    selectActions: [DELETE_SELECTED_RECORDS_ACTION],
}
