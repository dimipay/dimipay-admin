import { Hexile, Vexile } from "@haechi/flexile"

import { LoadSVG, PlainLink, Redirector } from "@/components"
import { GROUPED_TABLES } from "@/constants"
import { Important, Regular } from "@/typo"
import { SLUG } from "@/types"
import { graphIcon, logo } from "@/assets"

import { SidebarWrapper } from "./style"
import React from "react"

export const Sidebar: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => (
    <SidebarWrapper {...props} padding={10} gap={6}>
        <LoadSVG
            alt="디미페이 관리자 페이지 로고"
            height={5}
            width={40}
            src={logo}
        />
        {GROUPED_TABLES.map((group) => (
            <Vexile gap={2} key={group.groupName}>
                <Important>{group.groupName}</Important>
                {group.content.map((table) => (
                    <PlainLink
                        key={table.slug}
                        href={`/dash/${
                            Object.entries(SLUG).find(
                                ([key, v]) => v === table.slug
                            )?.[0] || ""
                        }`}
                    >
                        <Regular dark={3}>{table.name}</Regular>
                    </PlainLink>
                ))}
            </Vexile>
        ))}
        <PlainLink href="/dash/statistics">
            <Hexile>
                <LoadSVG
                    alt="그래프 아이콘"
                    height={5}
                    width={5}
                    src={graphIcon}
                />
                <Regular underline>통계</Regular>
            </Hexile>
        </PlainLink>
    </SidebarWrapper>
)

export default Redirector
