import { date, number, singleRelation, text } from "@/fields";
import { NeoScheme, SLUG } from "@/types";
import { NEO_RECORD_BASE_FIELDS } from "../common";

// model Coupon {
//     id                            String       @id @default(uuid())
//     createdAt                     DateTime     @default(now())
//     updatedAt                     DateTime     @default(now()) @updatedAt
//     name                          String
//     expiresAt                     DateTime?
//     amount                        Int
//     systemId                      String       @unique
//     issuerSid                     String
//     receiverSid                   String
//     usedTransactionSid            String?
//     User_Coupon_issuerSidToUser   User         @relation("Coupon_issuerSidToUser", fields: [issuerSid], references: [systemId])
//     User_Coupon_receiverSidToUser User         @relation("Coupon_receiverSidToUser", fields: [receiverSid], references: [systemId])
//     Transaction                   Transaction? @relation(fields: [usedTransactionSid], references: [systemId])
// }

export const NEO_COUPON_SCHEME: NeoScheme = {
    name: "쿠폰",
    slug: SLUG.coupon,
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        name: text({
            displayName: "이름",
            required: true,
            searchable: true
        }),
        expiresAt: date({
            displayName: "만료일",
            description: "쿠폰이 만료되는 날짜입니다",
            required: false,
        }),
        amount: number({
            displayName: "액면가",
            required: true,
            searchable: true
        }),
        systemId: text({
            displayName: "내부관리번호",
            required: true,
            isUnique: true,
            searchable: true,
            autoGenerative: true
        }),
        User_Coupon_issuerSidToUser: singleRelation({
            displayName: "발급자",
            required: true,
            searchable: true,
            targetTable: SLUG.user,
            nameField: "name",
        }),
        User_Coupon_receiverSidToUser: singleRelation({
            displayName: "사용자",
            required: true,
            searchable: true,
            targetTable: SLUG.user,
            nameField: "name",
        }),
        Transaction: singleRelation({
            displayName: "사용내역",
            required: false,
            searchable: true,
            targetTable: SLUG.transaction,
            nameField: "name",
        })
    }
}