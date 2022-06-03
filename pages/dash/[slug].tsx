import { useRecoilState, useSetRecoilState } from "recoil"
import {
    useCallback,
    useDebugValue,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react"
import { Hexile, Vexile } from "@haechi/flexile"
import { useRouter } from "next/router"
import { NextPage } from "next"

import { table, useConsole, useFilter, useKone } from "@/functions"
import { NewRecord } from "@/components/Subcontent/NewRecord"
import { addIcon, closeIcon, downloadIcon } from "@/assets"
import { FilterItem } from "@/functions/useFilter/partial"
import { Button, LoadSVG, Table } from "@/components"
import { Important, PageHeader } from "@/typo"
import { SLUG, TableRecord } from "@/types"
import { subContentAtom } from "@/coil"
import { TABLES } from "@/constants"

import { SubcontentWrapper } from "./style"
import { Sidebar } from "./partial"

const TableViewer: NextPage = () => {
    const router = useRouter()
    const [subcontent, setSubcontent] = useRecoilState(subContentAtom)
    const setSubContent = useSetRecoilState(subContentAtom)
    const slug = router.query.slug as SLUG

    const [scheme, setScheme] = useState(
        TABLES.find((table) => table.tableName === SLUG[slug])
    )

    const {
        filter,
        addFilter,
        element: filterElement,
        opened: filterOpened,
    } = useFilter(scheme)

    const [records, setRecords] = useState<TableRecord[]>([])

    const load = useCallback(() => {
        setSubContent(null)
        setRecords([])
        setScheme(undefined)

        const nextScheme = TABLES.find(
            (table) => table.tableName === SLUG[slug]
        )

        if (!nextScheme) return

        table[nextScheme.tableName]
            .GET({
                filter,
                amount: 20,
            })
            .then((e) => {
                setRecords(e)
                setScheme(nextScheme)
            })
    }, [filter, scheme])

    useConsole("RECORDS", { records, scheme })

    const loadMore = useCallback(async () => {
        if (records.length === 0) return
        if (!scheme) return

        const additionalRecords = await table[scheme.tableName].GET({
            filter,
            amount: 40,
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

    useEffect(() => {
        load()
    }, [filter.length, slug])

    return (
        <Hexile fillx filly>
            <Sidebar />
            {scheme && (
                <Vexile fillx filly padding={10} gap={4} scrollx relative>
                    <Hexile x="space">
                        <PageHeader>{scheme.displayName}</PageHeader>
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
                                        name: scheme.displayName + " 생성",
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
                    <Table
                        records={records}
                        scheme={scheme}
                        onReloadRequested={load}
                        addFilter={addFilter}
                        onReachEnd={loadMore}
                    />
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
                    {/* {filterElement} */}
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
                            onClick={() => setSubcontent(null)}
                        />
                    </Hexile>
                    {subcontent.element}
                </SubcontentWrapper>
            )}
        </Hexile>
    )
}

export default TableViewer
