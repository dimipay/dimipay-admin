import { Hexile, Vexile } from "@haechi/flexile"
import { useState, useEffect, useCallback } from "react"
import { useAtom } from "jotai"
import { styled } from "@/stitches.config"
import { DateTime } from "luxon"

import { PageHeader, Decorative, Important, Regular, Token } from "@/typo"
import { Statistics, StatisticsCard, TableRecord } from "@/types"
import { getStatistics, useFilter, useKone } from "@/functions"
import { STATISTICS } from "@/constants"
import { Sidebar } from "./partial"
import { userAtom } from "@/coil"
import { useRouter } from "next/router"
import { Card, MiniInput, Table } from "@/components"
import { NEO_ERP } from "@/schemes/erpstore"
import { MiniSelect } from "@/components/MiniSelect"
import { loadRedis } from "@/storage"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import axios from "axios"

interface ErpProps {
    SESSION_ID: string
    ERP_ROOT: string
}

interface ErpProductsResponse {
    Status: string
    Error: {
        Code: string
        Message: string
        MessageDetail: string
    } | null
    Data: {
        EXPIRE_DATE: string
        QUANTITY_INFO: string
        TRACE_ID: string
        TotalCnt: number
        Result: {
            WH_CD: string
            WH_DES: string
            PROD_CD: string
            PROD_DES: string
            PROD_SIZE_DES: string
            BAL_QTY: string
        }[]
    } | null
    Timestamp: string
}

export const ErpStoreDashboard = ({
    Data,
}: {
    Data: {
        EXPIRE_DATE: string
        QUANTITY_INFO: string
        TRACE_ID: string
        TotalCnt: number
        Result: {
            WH_CD: string
            WH_DES: string
            PROD_CD: string
            PROD_DES: string
            PROD_SIZE_DES: string
            BAL_QTY: string
        }[]
    }
}) => {
    const [user] = useAtom(userAtom)
    const router = useRouter()

    const scheme = NEO_ERP

    const [focusSearchbox, setFocusSearchbox] = useState<() => void>()

    const [sortField, setSortField] = useState<string | null>(
        scheme?.defaultSort?.field || null,
    )
    const [sortDirection, setSortDirection] = useState<"123" | "321" | null>(
        scheme?.defaultSort?.order || null,
    )
    const [fullRecordAmount, setFullRecordAmount] = useState<number>()
    const [currentCursor, setCurrentCursor] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(15)
    const [quickSearchQuery, setQuickSearchQuery] = useState<string>()

    const {
        filter,
        addFilter,
        clearFilter,
        element: filterElement,
        opened: filterOpened,
        ...filterOptions
    } = useFilter(scheme)

    useEffect(() => {
        if (!fullRecordAmount) return
        if (!currentCursor) return

        if (currentCursor > fullRecordAmount)
            setCurrentCursor(fullRecordAmount - 1)
        else if (currentCursor < 0) setCurrentCursor(0)
    }, [currentCursor, fullRecordAmount])

    const [records, setRecords] = useState<TableRecord[]>([])

    const load = useCallback(() => {
        if (!scheme) return
        setLoading(true)

        if (filterOptions.filterTargetTable !== scheme?.name) return

        setRecords(
            Data.Result.map(record => ({
                ...record,
                id: Number(record.PROD_CD),
                createdAt: new Date(),
                updatedAt: new Date(),
            })),
        )
        setFullRecordAmount(Data.Result.length)
        setLoading(false)
    }, [
        filter,
        scheme,
        sortField,
        sortDirection,
        filterOptions,
        pageSize,
        quickSearchQuery,
    ])

    useEffect(() => {
        setRecords([])
        clearFilter()
        setCurrentCursor(0)
        setSortDirection(scheme?.defaultSort?.order || null)
        setSortField(scheme?.defaultSort?.field || null)
        load()
    }, [scheme])

    useEffect(() => {
        setCurrentCursor(0)
    }, [fullRecordAmount])

    useEffect(() => {
        load()
    }, [
        filter,
        sortField,
        sortDirection,
        currentCursor,
        pageSize,
        quickSearchQuery,
    ])

    return (
        <Hexile fillx filly>
            <Sidebar />
            <Vexile fillx filly padding={10} gap={4} x="left">
                <PageHeader>ERP 상품</PageHeader>
                <Hexile fillx scrolly>
                    <Table
                        isLoading={loading}
                        records={records}
                        scheme={scheme}
                        onReloadRequested={load}
                        addFilter={addFilter}
                        enablePagination={
                            !!(
                                fullRecordAmount &&
                                fullRecordAmount > pageSize &&
                                records.length === pageSize
                            )
                        }
                        goPageBy={delta => {
                            setCurrentCursor(e => e + pageSize * delta)
                        }}
                        focusSearch={focusSearchbox}
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
                </Hexile>
                {fullRecordAmount !== undefined && (
                    <Hexile gap={8} x="left" y="center">
                        <Hexile y="center" gap={2}>
                            <Important
                                color="dark3"
                                onClick={() =>
                                    setCurrentCursor(e => e - pageSize)
                                }>
                                ←
                            </Important>
                            <MiniInput
                                type="number"
                                onChange={e => setCurrentCursor(+e)}
                                value={Math.max(currentCursor, 0).toString()}
                            />
                            <Important color="dark3">/</Important>
                            <Important color="dark3">
                                {fullRecordAmount}
                            </Important>

                            <Important
                                onClick={() =>
                                    setCurrentCursor(e => e + pageSize)
                                }
                                color="dark3">
                                →
                            </Important>
                        </Hexile>
                        <Hexile gap={2} y="center">
                            <Regular color="dark3">
                                한 페이지에 보여줄 갯수
                            </Regular>
                            <MiniSelect
                                options={[
                                    {
                                        label: "15",
                                        key: 15,
                                    },
                                    {
                                        label: "30",
                                        key: 30,
                                    },
                                    {
                                        label: "500",
                                        key: 500,
                                    },
                                ]}
                                onChange={e => setPageSize(+e)}
                                selected={{
                                    label: pageSize.toString(),
                                }}
                            />
                        </Hexile>
                    </Hexile>
                )}
            </Vexile>
        </Hexile>
    )
}

interface ERPLoginResult {
    Data: {
        EXPIRE_DATE: string
        NOTICE: string
        CODE: string
        Datas: {
            COM_CODE: string
            USER_ID: string
            SESSION_ID: string
        }
        Message: string
        RedirectUrl: string
    } | null
    Status: string
    Error: {
        Code: string
        Message: string
        MessageDetail: string
    } | null
    Timestamp: string | null
}

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext,
) => {
    const redis = await loadRedis()

    const root =
        process.env.NODE_ENV == "production"
            ? "https://oapiAA.ecount.com"
            : "https://sboapiAA.ecount.com"

    let sessionId = ""

    if (await redis.exists("ERPSESSION")) {
        sessionId = (await redis.get("ERPSESSION")) || ""
    } else {
        const res = await axios.post<ERPLoginResult>(
            `${root}/OAPI/V2/OAPILogin`,
            {
                COM_CODE: "635464",
                USER_ID: "server",
                API_CERT_KEY: process.env.ERP_SECRET,
                LAN_TYPE: "ko-KR",
                ZONE: "AA",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        )
        sessionId = res.data.Data?.Datas.SESSION_ID || ""
        await redis.set("ERPSESSION", sessionId)
    }

    const now = DateTime.now().toFormat("yyyyMMdd")
    const response = await axios.post<ErpProductsResponse>(
        `${root}/OAPI/V2/InventoryBalance/GetListInventoryBalanceStatusByLocation?SESSION_ID=${sessionId}`,
        {
            SESSION_ID: sessionId,
            BASE_DATE: now,
            WH_CD: "100",
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    )

    let records = {}

    if (response.data.Error !== null) {
        throw new Error(response.data.Error.Message)
    } else if (response.data.Data !== null) {
        records = response.data.Data
    }

    return {
        props: {
            Data: records,
        },
    }
}

export default ErpStoreDashboard
