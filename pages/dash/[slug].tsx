import { Hexile, Vexile } from "@haechi/flexile"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
import { NextPage } from "next"

import { table, useKone } from "@/functions"
import { Button, LoadSVG, Table } from "@/components"
import { TABLES } from "@/constants"
import { addIcon, closeIcon, downloadIcon } from "@/assets"
import { Important, PageHeader } from "@/typo"
import { subContentAtom } from "@/coil"
import { Sidebar } from "./partial"
import { SubcontentWrapper } from "./style"
import { SLUG } from "@/types"

const TableViewer: NextPage = () => {
    const router = useRouter()
    const [subcontent, setSubcontent] = useRecoilState(subContentAtom)
    const slug = router.query.slug as string

    const tableInfo = TABLES.find((table) => table.tableName === SLUG[slug])

    console.log(table[tableInfo?.tableName])

    const [tableData, reload] = useKone(table[tableInfo?.tableName]?.GET, {
        amount: 3,
    })

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
                    {tableData && (
                        <Table
                            records={tableData}
                            scheme={tableInfo}
                            onReloadRequested={reload}
                        />
                    )}
                </Vexile>
            )}
            {subcontent && (
                <SubcontentWrapper paddingx={6} paddingy={10} gap={6}>
                    <Hexile x="space">
                        <PageHeader>{subcontent.name}</PageHeader>
                        <LoadSVG
                            alt="닫기 버튼"
                            height={3}
                            width={3}
                            src={closeIcon}
                            onClick={() => setSubcontent(undefined)}
                        />
                    </Hexile>
                    {subcontent.element}
                </SubcontentWrapper>
            )}
        </Hexile>
    )
}

export default TableViewer
