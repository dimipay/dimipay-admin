import { Vexile } from "@haechi/flexile"

import { LoadSVG, PlainLink } from "@/components"
import { GROUPED_TABLES } from "@/constants"
import { Important, Regular } from "@/typo"
import { SLUG } from "@/types"
import { logo } from "@/assets"

import { SidebarWrapper } from "./style"

export const Sidebar = (
    <SidebarWrapper padding={10} gap={6}>
        <LoadSVG
            alt="디미페이 관리자 페이지 로고"
            height={5}
            width={40}
            src={logo}
        />
        {GROUPED_TABLES.map((group) => (
            <Vexile gap={2}>
                <Important>{group.groupName}</Important>
                {group.content.map((table) => (
                    <PlainLink
                        href={`/dash/${
                            Object.entries(SLUG).find(
                                ([key, v]) => v === table.tableName
                            )[0]
                        }`}
                    >
                        <Regular dark={3}>{table.name}</Regular>
                    </PlainLink>
                ))}
            </Vexile>
        ))}
    </SidebarWrapper>
)
