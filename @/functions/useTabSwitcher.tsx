import { TabSwitcher } from "@/components"
import { Tab } from "@/types"
import { useEffect } from "react"

import { useState } from "react"

export const useTabSwitcher = ({
    tabs,
    index = 0,
}: {
    tabs: Tab[]
    index?: number
}) => {
    const [selected, setSelected] = useState(index)

    useEffect(() => {
        setSelected(() => index)
    }, [index])

    return [
        <TabSwitcher
            key={index}
            tabs={tabs}
            selected={selected}
            onTabChange={index => setSelected(index)}
        />,
        selected,
        (index: number) => setSelected(() => index),
    ] as const
}
