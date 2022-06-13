import { STATISTICS } from "@/constants"
import { getStatistics, useKone } from "@/functions"
import { styled } from "@/stitches.config"
import { Statistics } from "@/types"
import {
    Decorative,
    Description,
    Important,
    PageHeader,
    Regular,
    Token,
} from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"
import { Sidebar } from "./partial"

const StatisticsCard = styled(Vexile, {
    backgroundColor: "white",
    borderRadius: "2rem",
    border: "0.5rem solid $dark5",
})

StatisticsCard.defaultProps = {
    padding: 4,
    gap: 4,
}

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
    data: Statistics
}> = ({ data }) => {
    if (data.number !== undefined)
        return (
            <Hexile y="bottom" gap={2}>
                {data.number.prefix && <Token>{data.number.prefix}</Token>}
                <Decorative>{data.number.value.toLocaleString()}</Decorative>
                {data.number.suffix && <Token>{data.number.suffix}</Token>}
            </Hexile>
        )

    if (data.list !== undefined)
        return (
            <Vexile gap={2}>
                {data.list.map((item) => (
                    <ListItem>
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
    const [statistics, reload] = useKone(getStatistics)

    return (
        <Hexile fillx filly>
            <Sidebar />
            <Vexile fillx filly padding={10} gap={4} x="left">
                <PageHeader>통계</PageHeader>
                <Hexile gap={4} linebreak y="top">
                    {STATISTICS.map(
                        (card) =>
                            statistics?.[card.id] === null || (
                                <StatisticsCard>
                                    <Regular>{card.name}</Regular>
                                    {statistics?.[card.id] && (
                                        <StatisticsRenderer
                                            data={statistics[card.id]!}
                                        />
                                    )}
                                </StatisticsCard>
                            )
                    )}
                </Hexile>
            </Vexile>
        </Hexile>
    )
}

export default StatisticsDashboard
