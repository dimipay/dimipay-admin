import { useCallback, useEffect, useMemo, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import immer from "immer"

import { useHIDInput, useTabSwitcher } from "@/functions"
import { Description, Important, Regular, Token } from "@/typo"
import { Button, WizardFrame } from "@/components"
import { Hexile, Vexile } from "@haechi/flexile"
import { StoreinProductTile } from "./partial"
import { modalContentAtom, storeInWizardFileAtom } from "@/coil"
import { Sidebar } from "pages/dash/partial"
import { useRouter } from "next/router"
import { Store } from "@/types"
import { toast } from "react-toastify"

const TAB_INDEX = {
    CHECKING: 0,
    FINISHED: 1,
}

export const CheckStorein = () => {
    const router = useRouter()
    const storeinSheet = useRecoilValue(storeInWizardFileAtom)
    const showModal = useSetRecoilState(modalContentAtom)
    const [scannedAmounts, setScanedAmount] = useState<Record<string, number>>(
        Object.fromEntries(storeinSheet?.map(e => [e.barcode, 0]) || []),
    )

    const [scanHistory, setScanHistory] = useState<
        {
            barcode: string
            times: number
        }[]
    >([])

    const productNameBarcodeMap = useMemo(() => {
        if (!storeinSheet) return {}
        const map: Record<string, string> = {}

        for (const storein of storeinSheet) {
            map[storein.barcode] = storein.name
            map[storein.name] = storein.barcode
        }

        return map
    }, [storeinSheet])

    const requiredAmountByProductBarcode = useMemo(() => {
        if (!storeinSheet) return {}
        const map: Record<string, number> = {}

        for (const storein of storeinSheet) {
            map[storein.barcode] = storein.amount
        }

        return map
    }, [storeinSheet])

    const sortedSheet = useMemo(() => {
        if (storeinSheet) {
            const sorted = [...storeinSheet].sort((a, b) => {
                const aIndex =
                    scanHistory.findIndex(e => e.barcode === a.barcode) ||
                    Infinity

                const bIndex =
                    scanHistory.findIndex(e => e.barcode === b.barcode) ||
                    Infinity

                return bIndex - aIndex
            })

            const grouped = sorted.reduce(
                (group, current) => {
                    const finished =
                        scannedAmounts[current.barcode] >= current.amount
                    if (finished) {
                        return immer(group, draft => {
                            draft.finished.push(current)
                        })
                    } else {
                        return immer(group, draft => {
                            draft.checking.push(current)
                        })
                    }
                },
                {
                    finished: [] as Store[],
                    checking: [] as Store[],
                },
            )

            console.log(grouped["checking"])

            return grouped
        }
    }, [scanHistory, storeinSheet, scannedAmounts])

    const [tabSwitcher, currentTab, setTab] = useTabSwitcher({
        tabs: [
            {
                label: "확인중",
                message: "13개",
            },
            {
                label: "확인 완료",
                message: "13개",
            },
        ],
    })

    const increaseAmount = useCallback(
        (barcode: string) => {
            if (barcode in productNameBarcodeMap) {
                const delta =
                    requiredAmountByProductBarcode[barcode] -
                    (scannedAmounts[barcode] + 1)

                // 1개 초과일 때
                if (delta < 0) {
                    setTab(1)
                    if (delta === -1) {
                        toast.info("과입고입니다")
                    }
                } else {
                    if (delta === 0) {
                        toast.success("제품 스캔이 완료됐습니다!")
                    }

                    setTab(0)
                }

                setScanedAmount(scanned => ({
                    ...scanned,
                    [barcode]: scanned[barcode] + 1,
                }))
            }

            if (scanHistory[0]?.barcode === barcode) {
                setScanHistory(_scanHistory => [
                    {
                        barcode: barcode,
                        times: _scanHistory[0].times + 1,
                    },
                    ..._scanHistory.slice(1),
                ])
            } else
                setScanHistory(_scanHistory => [
                    {
                        barcode: barcode,
                        times: 1,
                    },
                    ..._scanHistory,
                ])
        },
        [scanHistory, productNameBarcodeMap],
    )

    useHIDInput({
        onData(data) {
            increaseAmount(data)
        },
    })

    const scanFinish = () => {
        if (!storeinSheet) return

        const unmatched = storeinSheet.reduce(
            (grouped, current) => {
                const delta = scannedAmounts[current.barcode] - current.amount

                return immer(grouped, draft => {
                    draft[delta < 0 ? "less" : "more"].push(current)
                })
            },
            {
                more: [] as Store[],
                less: [] as Store[],
            },
        )

        if (unmatched.less.length > 0 || unmatched.more.length > 0) {
            showModal({
                wide: true,
                title: "일부 상품의 스캔한 수량이 입고 파일 내용과 달라요",
                content: (
                    <Vexile gap={6} filly>
                        <Regular>이대로 입고를 진행할까요?</Regular>
                        {unmatched.more.length ? (
                            <Vexile gap={2}>
                                <Important>파일 내용보다 많은 상품</Important>
                                <Hexile gap={4} linebreak>
                                    {unmatched.more.map(e => (
                                        <StoreinProductTile
                                            color="positive"
                                            currentAmount={
                                                scannedAmounts[e.barcode]
                                            }
                                            store={e}
                                        />
                                    ))}
                                </Hexile>
                            </Vexile>
                        ) : undefined}
                        {unmatched.less.length ? (
                            <Vexile gap={2}>
                                <Important>파일 내용보다 적은 상품</Important>
                                <Hexile gap={4} linebreak>
                                    {unmatched.less.map(e => (
                                        <StoreinProductTile
                                            color="negative"
                                            currentAmount={
                                                scannedAmounts[e.barcode]
                                            }
                                            store={e}
                                        />
                                    ))}
                                </Hexile>
                            </Vexile>
                        ) : undefined}

                        <Hexile filly fillx y="bottom" paddingy={4}>
                            <Hexile gap={2} fillx>
                                <Button fillx block color="black">
                                    <Important white>
                                        다시 한번 확인할게요
                                    </Important>
                                </Button>
                                <Button fillx block>
                                    <Important white>
                                        이 갯수가 맞습니다
                                    </Important>
                                </Button>
                            </Hexile>
                        </Hexile>
                    </Vexile>
                ),
            })
        }
    }

    return (
        <Hexile fillx filly>
            <Sidebar />
            <Vexile fillx filly x="center" y="center" padding={10}>
                <WizardFrame
                    title="입고 물품들을 스캔해주세요"
                    description="모든 물건을 하나 하나 스캔해주세요"
                    filly
                    fillx>
                    <Hexile
                        gap={8}
                        filly
                        style={{
                            maxHeight: "calc(100% - 80px)",
                        }}>
                        <Vexile gap={6} fillx>
                            <Hexile gap={4}>{tabSwitcher}</Hexile>
                            <Hexile
                                linebreak
                                gap={4}
                                filly
                                style={{
                                    overflowY: "auto",
                                }}>
                                {sortedSheet?.[
                                    currentTab === TAB_INDEX.CHECKING
                                        ? "checking"
                                        : "finished"
                                ]?.map((store, index) => (
                                    <StoreinProductTile
                                        active={
                                            store.barcode ===
                                            scanHistory[0]?.barcode
                                        }
                                        store={store}
                                        currentAmount={
                                            scannedAmounts[store.barcode]
                                        }
                                    />
                                ))}
                            </Hexile>
                        </Vexile>
                        <Vexile fillx gap={4}>
                            <Important>방금 스캔한 상품들</Important>
                            <Vexile
                                filly
                                style={{ overflowY: "scroll" }}
                                gap={4}>
                                {scanHistory.map(barcode => (
                                    <Hexile gap={2} x="space">
                                        <Hexile gap={1} y="center">
                                            <Token>{barcode.times}번</Token>
                                            <Regular>
                                                {productNameBarcodeMap[
                                                    barcode.barcode
                                                ] || "알 수 없음"}
                                            </Regular>
                                        </Hexile>
                                        <Description>
                                            {barcode.barcode}
                                        </Description>
                                    </Hexile>
                                ))}
                            </Vexile>
                            <Button block onClick={scanFinish}>
                                <Important white>스캔을 완료했어요</Important>
                            </Button>
                        </Vexile>
                    </Hexile>
                </WizardFrame>
            </Vexile>
        </Hexile>
    )
}

export default CheckStorein
