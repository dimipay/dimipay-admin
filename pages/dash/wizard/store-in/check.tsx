import { useCallback, useEffect, useMemo, useState } from "react"
import { useRecoilValue } from "recoil"
import immer from "immer"

import { useHIDInput, useTabSwitcher } from "@/functions"
import { Description, Important, Regular, Token } from "@/typo"
import { Button, WizardFrame } from "@/components"
import { Hexile, Vexile } from "@haechi/flexile"
import { StoreinProductTile } from "./partial"
import { storeInWizardFileAtom } from "@/coil"
import { Sidebar } from "pages/dash/partial"
import { useRouter } from "next/router"

export const CheckStorein = () => {
    const router = useRouter()

    const storeinSheet = useRecoilValue(storeInWizardFileAtom)
    const [scannedAmounts, setScanedAmount] = useState<Record<string, number>>(
        Object.fromEntries(storeinSheet?.map(e => [e.barcode, 0]) || []),
    )

    const [scanHistory, setScanHistory] = useState<
        {
            barcode: string
            times: number
        }[]
    >([])

    // sort sheet by recently scnned in the history
    const sortedSheet = useMemo(
        () =>
            storeinSheet &&
            [...storeinSheet].sort((a, b) => {
                const aIndex = scanHistory.findIndex(
                    e => e.barcode === a.barcode,
                )
                const bIndex = scanHistory.findIndex(
                    e => e.barcode === b.barcode,
                )
                return bIndex - aIndex
            }),
        [scanHistory, storeinSheet],
    )

    const productNameBarcodeMap = useMemo(() => {
        if (!storeinSheet) return {}
        const map: Record<string, string> = {}

        for (const storein of storeinSheet) {
            map[storein.barcode] = storein.name
            map[storein.name] = storein.barcode
        }

        return map
    }, [storeinSheet])

    const [tabSwitcher] = useTabSwitcher({
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

    return (
        <Hexile fillx filly>
            <Sidebar />
            <Vexile fillx filly x="center" y="center" padding={10}>
                <WizardFrame
                    title="입고 물품들을 스캔해주세요"
                    description="모든 물건을 하나 하나 스캔해주세요"
                    filly
                    fillx>
                    <Hexile gap={8} filly>
                        <Vexile gap={6} fillx relative>
                            <Hexile gap={4}>{tabSwitcher}</Hexile>
                            <Hexile
                                linebreak
                                gap={4}
                                filly
                                style={{
                                    overflowY: "auto",
                                    maxHeight: "calc(100% - 188px)",
                                }}>
                                {sortedSheet?.map((store, index) => (
                                    <StoreinProductTile
                                        active={index === 0}
                                        store={store}
                                        currentAmount={
                                            scannedAmounts[store.barcode]
                                        }
                                    />
                                ))}
                            </Hexile>
                            <Button block>
                                <Important white>다음</Important>
                            </Button>
                        </Vexile>
                        <Vexile fillx gap={4}>
                            <Important>방금 스캔한 상품들</Important>
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
                                    <Description>{barcode.barcode}</Description>
                                </Hexile>
                            ))}
                        </Vexile>
                    </Hexile>
                </WizardFrame>
            </Vexile>
        </Hexile>
    )
}

export default CheckStorein
