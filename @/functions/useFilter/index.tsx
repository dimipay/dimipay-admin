import { Filter, NeoScheme } from "@/types"
import { Hexile } from "@haechi/flexile"
import { useEffect, useMemo, useState } from "react"
import { FilterItem, FilterWithDisablity } from "./partial"

export const useFilter = (scheme?: NeoScheme) => {
    const [filters, setFilters] = useState<FilterWithDisablity[]>([])

    useEffect(() => {
        setFilters([])
    }, [scheme])

    const validFilter = useMemo(
        () =>
            scheme?.fields
                ? (filters
                      .filter(
                          (f) =>
                              !f.disabled &&
                              !!f.content[1] &&
                              f.content[2] &&
                              f.content[0] in scheme.fields
                      )
                      .map((e) => e.content) as Filter[])
                : [],
        [filters, scheme]
    )

    return {
        opened: !!filters.length,
        filter: validFilter,
        filterTargetTable: scheme?.name,
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
                {filters.map(
                    ({ content, disabled }, index) =>
                        scheme.fields[content[0]] && (
                            <FilterItem
                                filter={content}
                                disabled={disabled}
                                field={scheme.fields[content[0]]}
                                updateFilter={(update) => {
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
                        )
                )}
            </Hexile>
        ),
    }
}
