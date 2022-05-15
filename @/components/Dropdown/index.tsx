import { UseFormRegisterReturn } from "react-hook-form"
import React, { useEffect, useState } from "react"

import { clickWithSpace } from "@/functions"
import { Regular, Token } from "@/typo"
import { Option } from "@/types"

import { DataView, SearchInput, Searhbox, Wrapper } from "./style"
import { SelectableList } from "./partial"
import { searchIcon } from "@/assets"
import { LoadSVG } from "../LoadSVG"

export const Dropdown: React.FC<{
    options?: Option[]
    optionsRetriever?: (query?: string) => Promise<Option[]>
    data?: Option[]
    name: string
    placeholder: string
    hooker: UseFormRegisterReturn
    displayMap?: Record<string | number, string>
    error?: string
    disabled?: boolean
    maxSelectAmount?: number
}> = (props) => {
    const [logicalValue, setLogicalValue] = useState<Option[]>(props.data || [])
    const [loadedOptions, setLoadedOptions] = useState<Option[]>(props.options)

    const [searchQuery, setSearchQuery] = useState<string>()
    const [opened, setOpened] = useState(false)

    const logicalSelect = React.useRef<HTMLSelectElement>(null)

    useEffect(() => {
        console.log(logicalValue)
        if (logicalSelect.current) {
            props.hooker.onChange({
                target: logicalSelect.current,
                type: "change",
            })
        }
    }, [props.hooker, logicalValue])

    useEffect(() => {
        if (props.error) logicalSelect.current.parentElement.focus()
    }, [props.error, logicalSelect])

    useEffect(() => {
        if (props.optionsRetriever) {
            props.optionsRetriever(searchQuery).then((options) => {
                setLoadedOptions(options)
            })
        }
    }, [props.optionsRetriever, searchQuery])

    return (
        <label>
            <Wrapper
                hasError={!!props.error}
                onKeyDown={clickWithSpace}
                onFocus={props.disabled ? undefined : (e) => setOpened(true)}
                onBlur={
                    props.disabled
                        ? undefined
                        : (e) => {
                              if (e.currentTarget.contains(e.relatedTarget))
                                  return
                              setOpened(false)
                          }
                }
                tabIndex={props.disabled ? -1 : 0}
                disabled={!!props.disabled}
            >
                <select
                    style={{ display: "none" }}
                    name={props.hooker.name}
                    ref={(ref) => {
                        if (!ref) return
                        logicalSelect.current = ref
                        props.hooker.ref(ref)
                    }}
                    multiple
                >
                    {logicalValue.map((e) => (
                        <option selected key={e.key} value={e.key || e.label}>
                            {e.label || e.key}
                        </option>
                    ))}
                </select>
                <DataView
                    gap={1.5}
                    padding={3}
                    hasError={!!props.error}
                    disabled={!!props.disabled}
                >
                    <Token>{props.name}</Token>
                    <Regular dark={logicalValue.length ? 1 : 3}>
                        {logicalValue.length
                            ? logicalValue
                                  .map((e) => e.label || e.key)
                                  .join(", ")
                            : props.placeholder}
                    </Regular>
                    {props.error && <Token color="error">{props.error}</Token>}
                </DataView>
                {opened && (
                    <>
                        <Searhbox padding={3} y="center" gap={2}>
                            <LoadSVG
                                alt="검색 아이콘"
                                src={searchIcon}
                                height={3}
                                width={3}
                            />
                            <SearchInput
                                placeholder="검색"
                                onKeyDown={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                    setSearchQuery(() => e.target?.value)
                                }}
                            />
                        </Searhbox>
                        <SelectableList
                            options={loadedOptions}
                            itemLabelMap={props.displayMap}
                            selectedOptions={logicalValue}
                            onItemSelected={(option) => {
                                if (
                                    logicalValue.some(
                                        (e) =>
                                            e.key === option.key ||
                                            e.label === option.label
                                    )
                                ) {
                                    setLogicalValue((prev) =>
                                        prev.filter(
                                            (v) =>
                                                !(
                                                    v.key === option.key ||
                                                    v.label === option.label
                                                )
                                        )
                                    )
                                } else {
                                    setLogicalValue((prev) => [
                                        ...prev,
                                        {
                                            key: option.key,
                                            label: option.label,
                                        },
                                    ])
                                }
                            }}
                        />
                    </>
                )}
            </Wrapper>
        </label>
    )
}
