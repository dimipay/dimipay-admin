import { useRecoilState, useSetRecoilState } from "recoil"
import { Hexile, Vexile } from "@haechi/flexile"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { NextPage } from "next"

import { NewRecord } from "@/components/Subcontent/NewRecord"
import { addIcon, closeIcon, downloadIcon } from "@/assets"
import { FilterItem } from "@/functions/useFilter/partial"
import { table, useConsole, useFilter, useKone } from "@/functions"
import { Button, LoadSVG, Table } from "@/components"
import { Important, PageHeader } from "@/typo"
import { subContentAtom } from "@/coil"
import { TABLES } from "@/constants"
import { SLUG, TableRecord } from "@/types"

import { SubcontentWrapper } from "./style"
import { Sidebar } from "./partial"

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

    const [records, setRecords] = useState<TableRecord[]>([])

    const load = useCallback(() => {
        if (!scheme) return

        table[scheme.tableName]
            .GET({
                filter,
                amount: 20,
            })
            .then(setRecords)
    }, [filter, scheme])

    const loadMore = useCallback(async () => {
        if (records.length === 0) return

        const additionalRecords = await table[scheme.tableName].GET({
            filter,
            amount: 20,
            lastId: records[records.length - 1].id,
        })

        const merged = [
            ...records,
            ...additionalRecords.slice(
                additionalRecords.findIndex(
                    (e) => e.id === records[records.length - 1].id
                ) + 1
            ),
        ]

        setRecords(merged)
    }, [setRecords, records, filter, scheme])

    useConsole("FILTERERDFSJ", filter)

    useEffect(() => {
        load()
    }, [scheme, filter.length])

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
                                                onReloadRequested={load}
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
                    {records && (
                        <Table
                            records={records}
                            scheme={scheme}
                            onReloadRequested={load}
                            addFilter={addFilter}
                            onReachEnd={loadMore}
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
