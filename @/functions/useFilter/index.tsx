import { Filter, Scheme } from "@/types"
import { Hexile } from "@haechi/flexile"
import { useState } from "react"
import { FilterItem, FilterWithDisablity } from "./partial"

export const useFilter = (scheme?: Scheme) => {
    const [filters, setFilters] = useState<FilterWithDisablity[]>([])
    const validFilter = filters
        .filter((f) => !f.disabled && !!f.content[1] && f.content[2])
        .map((e) => e.content) as Filter[]

    return {
        opened: !!filters.length,
        filter: validFilter,
        clearFilter: () => setFilters([]),
        addFilter(key: string) {
            setFilters((prev) => [
                ...prev,
                {
                    content: [key, undefined, undefined],
                    disabled: false,
                },
            ])
        },
        element: scheme && (
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
                {filters.map(({ content, disabled }, index) => (
                    <FilterItem
                        filter={content}
                        disabled={disabled}
                        field={scheme.fields[content[0]]}
                        updateFilter={(update) => {
                            console.log(update)

                            if (update === null)
                                return setFilters((prev) => [
                                    ...prev.slice(0, index),
                                    ...prev.slice(index + 1),
                                ])

                            setFilters((prev) => [
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
