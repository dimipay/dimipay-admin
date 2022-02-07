import { eyeIcon, trashIcon } from "@/assets"
import { LoadSVG, MiniInput } from "@/components"
import { MiniSelect } from "@/components/MiniSelect"
import { Filter, korOperatorMap, PartialFilter, Scheme } from "@/types"
import { Regular } from "@/typo"
import { Hexile } from "@haechi/flexile"
import { useEffect, useState } from "react"
import { FilterItem, FilterWithDisablity } from "./partial"
import { ItemWrapper } from "./style"

export const useFilter = (scheme: Scheme) => {
    const [filter, setFilter] = useState<FilterWithDisablity[]>([])

    return {
        opened: !!filter.length,
        filter: filter
            .filter(
                (e) => !e.disabled && e.content[1] !== undefined && e.content[2]
            )
            .map((e) => e.content) as Filter[],
        addFilter(key: string) {
            setFilter((prev) => [
                ...prev,
                {
                    content: [key, undefined, undefined],
                    disabled: false,
                },
            ])
        },
        element: (
            <Hexile
                gap={2}
                style={{
                    position: "absolute",
                    left: "10rem",
                    right: "10rem",
                    bottom: "10rem",
                    height: "100%",
                    pointerEvents: "none",
                }}
                y="bottom"
            >
                {filter.map(({ content, disabled }, index) => (
                    <FilterItem
                        filter={content}
                        disabled={disabled}
                        field={scheme.fields[content[0]]}
                        updateFilter={(update) => {
                            if (update === null)
                                return setFilter((prev) => [
                                    ...prev.slice(0, index),
                                    ...prev.slice(index + 1),
                                ])

                            setFilter((prev) => [
                                ...prev.slice(0, index),
                                update,
                                ...prev.slice(index + 1),
                            ])
                        }}
                    />
                ))}
            </Hexile>
        ),
    }
}
