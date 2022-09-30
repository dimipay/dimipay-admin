import { Hexile, Vexile } from "@haechi/flexile"
import { useState, useEffect } from "react"
import { useAtom } from "jotai"
import { styled } from "@/stitches.config"

import { PageHeader, Decorative, Important, Regular, Token } from "@/typo"
import { Statistics, StatisticsCard } from "@/types"
import { getStatistics, useKone } from "@/functions"
import { STATISTICS } from "@/constants"
import { Sidebar } from "./partial"
import { userAtom } from "@/coil"
import { useRouter } from "next/router"
import { Card } from "@/components"

const ListItem = styled(Hexile, {
    backgroundColor: "$dark6",
    borderRadius: "2rem",
})

ListItem.defaultProps = {
    padding: 3,
    y: "center",
    gap: 4,
    x: "space",
}

export const StatisticsRenderer: React.FC<{
    id: string
    statistics: Record<string, Statistics | null>
    cardInfo: StatisticsCard
}> = props => {
    const [data, setData] = useState<Statistics | null>(
        props.statistics[props.id],
    )

    useEffect(() => {
        ;(async () => {
            if (!props.cardInfo.computedField) return
            const computeResult = await props.cardInfo.computedField(
                props.statistics,
            )
            setData(() => computeResult)
        })()
    }, [props.statistics])

    if (!data) return <></>

    if (data.number !== undefined)
        return (
            <Hexile y="center" gap={1}>
                {data.number.prefix && <Token>{data.number.prefix}</Token>}
                <Decorative>{data.number.value.toLocaleString()}</Decorative>
                {data.number.suffix && <Token>{data.number.suffix}</Token>}
            </Hexile>
        )

    if (data.list !== undefined)
        return (
            <Vexile gap={2}>
                {data.list.map(item => (
                    <ListItem key={item.label}>
                        <Important>{item.label}</Important>
                        {item.secondaryLabel && (
                            <Regular>{item.secondaryLabel}</Regular>
                        )}
                    </ListItem>
                ))}
            </Vexile>
        )

    return <></>
}

export const StatisticsDashboard = () => {
    const [user] = useAtom(userAtom)
    const router = useRouter()

    useEffect(() => {
        if (!user?.user?.AdminRole?.permissions?.extra?.statistics) {
            router.replace("/login")
        }
    }, [user, router])

    const [statisticsValues] = useKone(getStatistics)

    return (
        <Hexile fillx filly>
            <Sidebar />
            <Vexile fillx filly padding={10} gap={4} x="left">
                <PageHeader>통계</PageHeader>
                <Vexile gap={4} y="top">
                    {/* {STATISTICS.map(
                        (card) =>
                            statistics?.[card.id] === null || (
                                <StatisticsCard key={card.id}>
                                    <Regular>{card.name}</Regular>
                                    {statistics?.[card.id] && (
                                        <StatisticsRenderer
                                            data={statistics[card.id]!}
                                        />
                                    )}
                                </StatisticsCard>
                            )
                    )} */}
                    {STATISTICS.map(group => (
                        <>
                            <Important>{group.label}</Important>
                            <Hexile gap={2} y="top">
                                {group.items.map(
                                    card =>
                                        statisticsValues && (
                                            <Card key={card.id}>
                                                <Regular>{card.name}</Regular>
                                                {
                                                    <StatisticsRenderer
                                                        id={card.id}
                                                        cardInfo={card}
                                                        statistics={
                                                            statisticsValues
                                                        }
                                                    />
                                                }
                                            </Card>
                                        ),
                                )}
                            </Hexile>
                        </>
                    ))}
                </Vexile>
            </Vexile>
        </Hexile>
    )
}

export default StatisticsDashboard
