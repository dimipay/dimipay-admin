import { Scheme, SLUG } from "@/types";
import { RECORD_BASE_FIELDS } from "./common";

// model StoreProducts {
//     createdAt       DateTime          @default(now())
//     updatedAt       DateTime          @default(now())
//     id              Int               @id @default(autoincrement())
//     systemId        String            @unique @default(dbgenerated("gen_random_uuid()"))
//     totalCost       Int
//     storeDate       DateTime          @default(now())
//     title           String            @unique
//     workerSid       String
//     AdminAccount    AdminAccount      @relation(fields: [workerSid], references: [systemId])
//     ProductInOutLog ProductInOutLog[]
//   }

export const STORE_PRODUCTS: Scheme = {
    displayName: "상품 입고",
    tableName: SLUG.storeProducts,
    fields: {
        ...RECORD_BASE_FIELDS,
        systemId: {
            displayName: "내부관리번호",
            typeOption: {
                type: "string",
            },
            required: true,
            autoGenerative: true,
            readOnly: true,
            invisibleInTable: true,
        },
        totalCost: {
            displayName: "총 금액",
            typeOption: {
                type: "number",
            },
            required: true,

        },
        storeDate: {
            displayName: "입고 일자",
            typeOption: {
                type: "date",
            },
            required: false,
            autoGenerative: true,
        },
        title: {
            displayName: "메모",
            typeOption: {
                type: "string",
            },
            required: true,
        },
        AdminAccount: {
            displayName: "입고자",
            typeOption: {
                type: "relation-single",
                target: SLUG.adminAccount,
                displayNameField: "name",
            },
            required: true,

        },
        ProductInOutLog: {
            displayName: "입고 이력",
            typeOption: {
                type: "relation-single",
                target: SLUG.productInOutLog,
                displayNameField: "id",
            },
            required: true,
        }
    }
}
