import React, { useCallback, useEffect, useState } from "react"

import { TableRecord, ToolbarAction } from "@/types"
import { Description, Important } from "@/typo"

import { ActionToolbars, HeaderCell, TableContent, TableWrapper } from "./style"
import { ActionableHeaderCell, Row } from "./partial"
import { Button, DividerLine } from ".."
import { Hexile, Vexile } from "@haechi/flexile"
import { NeoScheme } from "@/schemes"
import { useInView } from "react-intersection-observer"

export const Table: React.FC<{
    scheme: NeoScheme
    records: TableRecord[]
    onReloadRequested(): void
    addFilter(key: string): void
    setSort?(key: string): void
    sortField?: string | null
    sortDirection?: "123" | "321" | null
    nextPage?: () => void
    isLoading?: boolean
    enablePagination?: boolean
}> = ({ records: data, ...props }) => {
    const [selectedRecordIds, setSelectedRecordIds] = React.useState<number[]>(
        []
    )

    const [isReached, setIsReached] = useState<boolean>(false)

    const { ref, inView } = useInView({
        threshold: 0.03,
    })

    const scrollRef = React.useRef<HTMLDivElement | null>(null)
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const onScroll = useCallback(
        (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
            if (!props.enablePagination) return
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            const target = e.currentTarget as HTMLDivElement

            scrollRef.current = target

            const bottom =
                target.scrollHeight - target.scrollTop - target.clientHeight

            if (bottom === 0 && !isReached) {
                timeoutRef.current = setTimeout(() => {
                    setIsReached(true)
                }, 100)
            } else {
                timeoutRef.current = setTimeout(() => {
                    setIsReached(false)
                }, 300)
            }
        },
        [isReached, scrollRef, props]
    )

    useEffect(() => {
        const element = scrollRef.current
        if (!element) return

        if (inView) {
            element.scrollTop = 0
            setTimeout(() => {
                props.nextPage?.()
            }, 100)
        }
    }, [inView])

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Vexile gap={4} filly>
                <TableWrapper
                    fillx
                    filly
                    scrollx
                    y="space"
                    onScroll={onScroll}
                    isLoading={props.isLoading}
                >
                    <TableContent>
                        <thead>
                            <tr>
                                <HeaderCell>
                                    <input
                                        type="checkbox"
                                        onChange={(e) =>
                                            setSelectedRecordIds(
                                                e.currentTarget.checked
                                                    ? data.map((e) => e.id)
                                                    : []
                                            )
                                        }
                                    />
                                </HeaderCell>
                                {Object.entries(props.scheme.fields).map(
                                    ([key, field]) =>
                                        !field.field.invisibleInTable && (
                                            <ActionableHeaderCell
                                                key={key}
                                                onFilter={() =>
                                                    props.addFilter(key)
                                                }
                                                sortDirection={
                                                    (props.sortField === key &&
                                                        props.sortDirection) ||
                                                    undefined
                                                }
                                                onSort={() =>
                                                    props.setSort?.(key)
                                                }
                                            >
                                                {field.field.displayName || key}
                                            </ActionableHeaderCell>
                                        )
                                )}
                                {props.scheme.computedFields &&
                                    Object.entries(
                                        props.scheme.computedFields
                                    ).map(([key, field]) => (
                                        <ActionableHeaderCell key={key}>
                                            {field.name}
                                        </ActionableHeaderCell>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <Row
                                    key={row.id}
                                    selected={selectedRecordIds.includes(
                                        row.id
                                    )}
                                    onReloadRequested={props.onReloadRequested}
                                    onCheckboxClicked={(selected) => {
                                        if (selected)
                                            setSelectedRecordIds((prev) =>
                                                prev.filter(
                                                    (id) => id !== row.id
                                                )
                                            )
                                        else
                                            setSelectedRecordIds((prev) => [
                                                ...prev,
                                                row.id,
                                            ])
                                    }}
                                    row={row}
                                    scheme={props.scheme}
                                />
                            ))}
                        </tbody>
                    </TableContent>
                    {props.enablePagination && (
                        <>
                            <DividerLine />
                            <Hexile fillx x="center" padding={4}>
                                <Important color="accent">
                                    한 번 더 쓸어 내려서 다음 페이지
                                </Important>
                            </Hexile>
                        </>
                    )}
                    {isReached && (
                        <div
                            ref={ref}
                            style={{
                                padding: "6rem",
                            }}
                        ></div>
                    )}
                    {selectedRecordIds.length !== 0 && (
                        <ActionToolbars gap={2} padding={4}>
                            {props.scheme.selectActions?.length ? (
                                props.scheme.selectActions?.map(
                                    (action: ToolbarAction) => (
                                        <Button
                                            key={action.button.label}
                                            onClick={async () => {
                                                await action.func(
                                                    data.filter((d) =>
                                                        selectedRecordIds.includes(
                                                            d.id
                                                        )
                                                    ),
                                                    props.scheme
                                                )
                                                props.onReloadRequested()
                                            }}
                                        >
                                            <Important white>
                                                {action.button.label}
                                            </Important>
                                        </Button>
                                    )
                                )
                            ) : (
                                <Description>
                                    수행 가능한 동작이 없어요
                                </Description>
                            )}
                        </ActionToolbars>
                    )}
                </TableWrapper>
            </Vexile>
        </div>
    )
}
