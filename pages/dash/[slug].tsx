import { Hexile, Vexile } from "@haechi/flexile"
import { useRouter } from "next/router"
import { useRecoilState, useSetRecoilState } from "recoil"
import { NextPage } from "next"

import { table, useFilter, useKone } from "@/functions"
import { Button, LoadSVG, RecordEditer, Table } from "@/components"
import { TABLES } from "@/constants"
import { addIcon, closeIcon, downloadIcon } from "@/assets"
import { Important, PageHeader } from "@/typo"
import { subContentAtom } from "@/coil"
import { Sidebar } from "./partial"
import { SubcontentWrapper } from "./style"
import { SLUG } from "@/types"
import { NewRecord } from "@/components/Subcontent/NewRecord"
import { FilterItem } from "@/functions/useFilter/partial"

const TableViewer: NextPage = () => {
    const router = useRouter()
    const [subcontent, setSubcontent] = useRecoilState(subContentAtom)
    const setSubContent = useSetRecoilState(subContentAtom)
    const slug = router.query.slug as string

    const scheme = TABLES.find((table) => table.tableName === SLUG[slug])
    const {
        filter,
        addFilter,
        element: filterElement,
        opened: filterOpened,
    } = useFilter(scheme)

    const [tableData, reload] = useKone(table[scheme?.tableName]?.GET, {
        amount: 3,
        filter,
    })

    return (
        <Hexile fillx filly>
            {Sidebar}
            {scheme && (
                <Vexile fillx filly padding={10} gap={4} scrollx relative>
                    <Hexile x="space">
                        <PageHeader>{scheme.name}</PageHeader>
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
                            <Button
                                onClick={() =>
                                    setSubContent({
                                        element: (
                                            <NewRecord
                                                onReloadRequested={reload}
                                                scheme={scheme}
                                            />
                                        ),
                                        name: scheme.name + " 생성",
                                    })
                                }
                            >
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
                            scheme={scheme}
                            onReloadRequested={reload}
                            addFilter={addFilter}
                        />
                    )}
                    {/* dummy for space */}
                    {filterOpened && (
                        <div style={{ visibility: "hidden" }}>
                            <FilterItem
                                disabled
                                field={Object.values(scheme.fields)[0]}
                                filter={["", undefined, undefined]}
                                updateFilter={() => {}}
                            />
                        </div>
                    )}
                    {filterElement}
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
