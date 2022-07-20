import { date, singleRelation, text } from "@/fields"
import { NeoScheme, SLUG } from "@/types"
import { NEO_RECORD_BASE_FIELDS } from "./common"

// model Notice {
//   createdAt   DateTime  @default(now())
//   updatedAt   DateTime  @default(now())
//   startsAt    DateTime  @default(now())
//   endsAt      DateTime?
//   title       String
//   description String?
//   url         String?
//   systemId    String    @unique @default(dbgenerated("gen_random_uuid()"))
//   id          Int       @id @default(autoincrement())
//   authorSid   String
//   User        User      @relation(fields: [authorSid], references: [systemId])
// }

export const NEO_NOTICE_SCHEME: NeoScheme = {
    slug: SLUG.notice,
    name: "공지",
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        startsAt: date({
            required: false,
            displayName: "시작일",
        }),
        endsAt: date({
            required: false,
            displayName: "종료일",
        }),
        title: text({
            required: true,
            displayName: "제목",
        }),
        description: text({
            required: false,
            displayName: "설명",
        }),
        url: text({
            required: false,
            displayName: "상세 설명 주소",
        }),
        systemId: text({
            displayName: "내부 관리번호",
            autoGenerative: true,
            readOnly: true,
        }),
        User: singleRelation({
            required: true,
            displayName: "작성자",
            targetTable: SLUG.user,
            nameField: "name",
        }),
    },
}
