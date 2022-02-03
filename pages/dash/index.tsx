import { logo } from "@/assets"
import { LoadSVG, Table } from "@/components"
import { Description, Important, Regular } from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"
import { useState } from "react"
import { Sidebar } from "./style"

const TABLES = [
    {
        groupName: "판매",
        content: [
            {
                name: "상품",
                tableName: "dimipay_admin_product",
            },
            {
                name: "사용자",
                tableName: "dimipay_users",
            },
        ],
    },
    {
        groupName: "관리",
        content: [
            {
                name: "상품",
                tableName: "dimipay_admin_product",
            },
            {
                name: "사용자",
                tableName: "dimipay_users",
            },
        ],
    },
]

export const Dash = () => {
    const [table, setOpenedTable] = useState<string>()

    return (
        <Hexile fillx filly>
            <Sidebar padding={10} gap={6}>
                <LoadSVG
                    alt="디미페이 관리자 페이지 로고"
                    height={5}
                    width={40}
                    src={logo}
                />
                {TABLES.map((group) => (
                    <Vexile gap={2}>
                        <Important>{group.groupName}</Important>
                        {group.content.map((table) => (
                            <Regular
                                onClick={() => setOpenedTable(table.tableName)}
                                dark={3}
                            >
                                {table.name}
                            </Regular>
                        ))}
                    </Vexile>
                ))}
            </Sidebar>
            {table ? (
                <Table tableName={table} />
            ) : (
                <Vexile fillx filly x="center" y="center">
                    <Description>왼쪽 메뉴에서 내용을 선택해주세요</Description>
                </Vexile>
            )}
        </Hexile>
    )
}

export default Dash
