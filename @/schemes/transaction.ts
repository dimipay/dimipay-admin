// model Transaction {
//     createdAt         DateTime           @default(now())
//     updatedAt         DateTime           @default(now()) @updatedAt
//     billingId         String?
//     totalPrice        Int
//     status            Transaction_status
//     statusText        String?
//     transactionMethod TransactionMethod
//     posDeviceId       String?
//     systemId          String             @unique @default(uuid())
//     id                Int                @id @default(autoincrement())
//     purchaseType      PurchaseType?
//     purchaseDetail    Json?
//     usedCardId        Int
//     userId            Int
//     posDevice         PosDevice?         @relation(fields: [posDeviceId], references: [id])
//     PaymentMethod     PaymentMethod      @relation(fields: [usedCardId], references: [id])
//     User              User               @relation(fields: [userId], references: [id])
//     Coupon            Coupon[]
//     products          Product[]
//   }

import { Scheme, SLUG } from "@/types"
import { RECORD_BASE_FIELDS } from "./common"

export const TRANSACTION_SCHEME: Scheme = {
    displayName: "판매 기록",
    tableName: SLUG.transaction,
    defaultSort: {
        field: "createdAt",
        order: "321"
    },
    fields: {
        ...RECORD_BASE_FIELDS,
        billingId: {
            displayName: "PG 결제 ID",
            typeOption: {
                type: "string",
            },
            readOnly: true,
            invisibleInTable: true,
        },
        totalPrice: {
            displayName: "금액",
            typeOption: {
                type: "number",
            },
            readOnly: true,
        },
        status: {
            displayName: "상태",
            typeOption: {
                type: "string",
                options: [
                    {
                        label: "대기중",
                        key: "PENDING",
                    },
                    {
                        label: "완료",
                        key: "CONFIRMED",
                    },
                    {
                        label: "취소",
                        key: "CANCELED",
                    },
                    {
                        label: "오류",
                        key: "ERROR",
                    },
                ],
            },
            required: true,
        },
        statusText: {
            displayName: "상태 메시지",
            typeOption: {
                type: "string",
            },
        },
        transactionMethod: {
            displayName: "인증",
            typeOption: {
                type: "string",
                options: [
                    {
                        label: "문자",
                        key: "SMS",
                    },
                    {
                        label: "앱QR",
                        key: "APP_QR",
                    },
                    {
                        label: "얼굴",
                        key: "FACESIGN",
                    },
                    {
                        label: "앱내부",
                        key: "INAPP",
                    },
                ],
            },
            readOnly: true,
        },
        systemId: {
            displayName: "내부관리번호",
            typeOption: {
                type: "string",
            },
            readOnly: true,
            invisibleInTable: true,
            autoGenerative: true,
        },
        purchaseType: {
            displayName: "거래 유형",
            typeOption: {
                type: "string",
                // options: [
                //     {
                //         label: "쿠폰 구매",
                //         key: "COUPON",
                //     },
                //     {
                //         label: "상품 결제",
                //         key: "GENERAL",
                //     },
                //     {
                //         label: "프린터 이용",
                //         key: "PRINTER",
                //     },
                // ],
            },
        },
        purchaseDetail: {
            displayName: "거래 상세",
            typeOption: {
                type: "string",
            },
            invisibleInTable: true,
        },
        posDevice: {
            displayName: "결제 단말기",
            typeOption: {
                type: "relation-single",
                target: SLUG.posDevice,
                displayNameField: "name",
            },
        },
        PaymentMethod: {
            displayName: "결제 수단",
            typeOption: {
                type: "relation-single",
                target: SLUG.paymentMethod,
                displayNameField: "name",
            },
            invisibleInTable: true,
        },
        User: {
            displayName: "사용자",
            typeOption: {
                type: "relation-single",
                target: SLUG.user,
                displayNameField: "name",
            },
        },
        // Coupon: {
        //     displayName: "쿠폰",
        //     typeOption: {
        //         type: "relation-multiple",
        //         target: SLUG.coupon,
        //         displayNameField: "name",
        //     },
        //     invisibleInTable: true,
        // },
        products: {
            displayName: "상품",
            typeOption: {
                type: "relation-multiple",
                target: SLUG.product,
                displayNameField: "name",
            },
            invisibleInTable: true,
        },
    },
}
