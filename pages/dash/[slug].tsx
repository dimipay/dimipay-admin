import { useCallback, useEffect, useMemo, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import HashLoader from "react-spinners/HashLoader"
import { Hexile, Vexile } from "@haechi/flexile"
import { useRouter } from "next/router"
import { NextPage } from "next"

import { NewRecord } from "@/components/Subcontent/NewRecord"
import { addIcon, closeIcon, downloadIcon } from "@/assets"
import { FilterItem } from "@/functions/useFilter/partial"
import { Important, PageHeader } from "@/typo"
import { table, useFilter } from "@/functions"
import { Button, LoadSVG, Table } from "@/components"
import { SLUG, TableRecord } from "@/types"
import { subContentAtom } from "@/coil"
import { TABLES } from "@/constants"

import { MAIN_ACCENT } from "@/stitches.config"
import { SubcontentWrapper } from "./style"
import { Sidebar } from "./partial"

const TableViewer: NextPage = () => {
    const slug = useRouter().query.slug as SLUG
    const [subcontent, setSubcontent] = useRecoilState(subContentAtom)
    const setSubContent = useSetRecoilState(subContentAtom)

    const scheme = useMemo(
        () => TABLES.find((table) => table.slug === SLUG[slug]),
        [slug]
    )
    const [sortField, setSortField] = useState<string | null>(
        scheme?.defaultSort?.field || null
    )
    const [sortDirection, setSortDirection] = useState<"123" | "321" | null>(
        scheme?.defaultSort?.order || null
    )

    const {
        filter,
        addFilter,
        clearFilter,
        element: filterElement,
        opened: filterOpened,
        ...filterOptions
    } = useFilter(scheme)

    const [records, setRecords] = useState<TableRecord[]>()

    const load = useCallback(() => {
        if (!scheme) return

        if (filterOptions.filterTargetTable !== scheme?.name) return

        console.log(scheme)
        table[scheme.slug]
            .GET({
                filter,
                amount: 20,
                sort:
                    sortField && sortDirection
                        ? [
                              {
                                  field: sortField,
                                  order: sortDirection,
                              },
                          ]
                        : undefined,
            })
            .then((e) => {
                setRecords(e)
            })
    }, [filter, scheme, sortField, sortDirection, filterOptions])

    const loadMore = useCallback(async () => {
        if (!records) return
        if (records.length === 0) return
        if (!scheme) return

        const additionalRecords = await table[scheme.slug].GET({
            filter,
            amount: 40,
            lastId: records[records.length - 1].id,
            sort: sortField
                ? [
                      {
                          field: sortField,
                          order: "321",
                      },
                  ]
                : undefined,
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
        setRecords(undefined)
        clearFilter()
        load()
    }, [scheme])

    useEffect(() => {
        load()
    }, [filter, sortField, sortDirection])

    return (
        <Hexile fillx filly>
            <Sidebar />
            {scheme ? (
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
                                        name: scheme.name + " 만들기",
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
                    {records ? (
                        <Table
                            records={records}
                            scheme={scheme}
                            onReloadRequested={load}
                            addFilter={addFilter}
                            onReachEnd={loadMore}
                            setSort={(fieldName: string) => {
                                if (sortField === fieldName) {
                                    if (sortDirection === "123") {
                                        setSortDirection("321")
                                        return
                                    }
                                    if (sortDirection === "321") {
                                        setSortDirection(null)
                                        setSortField(null)
                                        return
                                    }
                                }

                                setSortField(fieldName)
                                setSortDirection("123")
                            }}
                            sortField={sortField}
                            sortDirection={sortDirection}
                        />
                    ) : (
                        <Vexile fillx filly x="center" y="center">
                            <HashLoader color={MAIN_ACCENT} />
                        </Vexile>
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
            ) : (
                <Vexile fillx filly x="center" y="center">
                    <HashLoader color={MAIN_ACCENT} />
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
