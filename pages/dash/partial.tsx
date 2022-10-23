import { Hexile, Vexile } from "@haechi/flexile"
import React, { useMemo } from "react"
import { useAtom } from "jotai"

import { LoadSVG, PlainLink, Redirector } from "@/components"
import { GROUPED_TABLES } from "@/constants"
import { Important, Regular } from "@/typo"
import { graphIcon, logo } from "@/assets"
import { userAtom } from "@/coil"
import { SLUG } from "@/types"

import { SidebarWrapper } from "./style"

export const Sidebar: React.FC<React.HTMLProps<HTMLDivElement>> = props => {
    const [user] = useAtom(userAtom)
    const readAllowedTables = useMemo(
        () =>
            Object.entries(user?.user.AdminRole?.permissions || {})
                .filter(
                    ([_, permission]) =>
                        permission instanceof Array && permission.includes("R"),
                )
                .map(e => e[0]),
        [user],
    )

    return (
        <SidebarWrapper {...props} padding={10} gap={6}>
            <LoadSVG
                alt="디미페이 관리자 페이지 로고"
                height={5}
                width={40}
                src={logo}
            />
            {GROUPED_TABLES.map(e => ({
                ...e,
                content: e.content.filter(table =>
                    readAllowedTables.includes(table.slug),
                ),
            }))
                .filter(e => e.content.length !== 0)
                .map(group => (
                    <Vexile gap={2} key={group.groupName}>
                        <Important>{group.groupName}</Important>
                        {group.content.map(table => (
                            <PlainLink
                                passHref
                                key={table.slug}
                                href={`/dash/${
                                    Object.entries(SLUG).find(
                                        ([key, v]) => v === table.slug,
                                    )?.[0] || ""
                                }`}>
                                <Regular dark={3}>{table.name}</Regular>
                            </PlainLink>
                        ))}
                    </Vexile>
                ))}
            {user?.user?.AdminRole?.permissions?.extra?.statistics && (
                <PlainLink href="/dash/statistics" passHref>
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
            )}
            <PlainLink href="/dash/erpstore" passHref>
                <Hexile>
                    <Regular underline>ERP 상품재고</Regular>
                </Hexile>
            </PlainLink>
        </SidebarWrapper>
    )
}

export default Redirector
