import { Hexile, Vexile } from "@haechi/flexile"
import { useRouter } from "next/router"
import {
    useRecoilState,
    useRecoilState_TRANSITION_SUPPORT_UNSTABLE,
    useRecoilValue,
} from "recoil"
import { NextPage } from "next"

import { table, useConsole, useKone } from "@/functions"
import { Button, LoadSVG, Table } from "@/components"
import { GROUPED_TABLES, TABLES } from "@/constants"
import { addIcon, closeIcon, downloadIcon } from "@/assets"
import { Important, PageHeader } from "@/typo"
import { subContentAtom } from "@/coil"
import { Sidebar } from "./partial"
import { SubcontentWrapper } from "./style"

const TableViewer: NextPage = () => {
    const router = useRouter()
    const [subcontent, setSubcontent] = useRecoilState(subContentAtom)
    const slug = router.query.slug

    const tableInfo = TABLES.find((table) => table.slug === slug)
    const tableData = useKone(table[tableInfo?.slug]?.get, {
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
                    {tableData && <Table data={tableData} scheme={tableInfo} />}
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
