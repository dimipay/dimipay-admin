import { Hexile, Vexile } from "@haechi/flexile"
import { useRouter } from "next/router"
import { NextPage } from "next"

import { Button, LoadSVG, Table } from "@/components"
import { addIcon, downloadIcon } from "@/assets"
import { GROUPED_TABLES, TABLES } from "@/constants"
import { Important, PageHeader } from "@/typo"
import { Sidebar } from "./partial"
import { table, useConsole, useKone } from "@/functions"

const TableViewer: NextPage = () => {
    const router = useRouter()
    const slug = router.query.slug
    useConsole("SLUG", slug)

    const tableInfo = TABLES.find((table) => table.slug === slug)
    const tableData = useKone(table[tableInfo?.slug]?.get, {
        amount: 3,
    })

    useConsole("TABLE_FETCH", tableData)

    return (
        <Hexile fillx filly>
            {Sidebar}
            {tableInfo && (
                <Vexile fillx filly padding={10} gap={4} scrollx>
                    <Hexile x="space">
                        <PageHeader>{tableInfo.name}</PageHeader>
                        <Hexile gap={2}>
                            <Button color="black">
                                <LoadSVG
                                    src={downloadIcon}
                                    alt="다운로드 아이콘"
                                    height={4}
                                    width={4}
                                />
                                <Important white>다운로드</Important>
                            </Button>
                            <Button>
                                <LoadSVG
                                    src={addIcon}
                                    alt="추가 아이콘"
                                    height={4}
                                    width={4}
                                />
                                <Important white>추가</Important>
                            </Button>
                        </Hexile>
                    </Hexile>
                    {tableData && <Table data={tableData} />}
                </Vexile>
            )}
        </Hexile>
    )
}

export default TableViewer
