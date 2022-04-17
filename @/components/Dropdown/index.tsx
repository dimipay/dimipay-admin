import { UseFormRegisterReturn } from "react-hook-form"
import React, { useEffect, useState } from "react"

import { clickWithSpace, useConsole } from "@/functions"
import { Regular, Token } from "@/typo"
import { Option } from "@/types"

import { DataView, SearchInput, Searhbox, Wrapper } from "./style"
import { SelectableList } from "./partial"
import { MiniInput } from "../MiniInput"
import { searchIcon } from "@/assets"
import { LoadSVG } from "../LoadSVG"

export const Dropdown: React.FC<{
    options?: Option[]
    optionsRetriever?: (query?: string) => Promise<Option[]>
    data?: (string | number)[]
    name: string
    placeholder: string
    hooker: UseFormRegisterReturn
    displayMap?: Record<string | number, string>
    error?: string
    disabled?: boolean
    maxSelectAmount?: number
}> = (props) => {
    const [opened, setOpened] = useState(false)
    const [logicalValue, setLogicalValue] = useState(props.data || [])

    const logicalSelect = React.useRef<HTMLSelectElement>(null)

    useEffect(() => {
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

    const [loadedOptions, setLoadedOptions] = useState<Option[]>(props.options)
    const [searchQuery, setSearchQuery] = useState<string>()

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
                    ref={(r) => {
                        if (!r) return
                        logicalSelect.current = r
                        props.hooker.ref(r)
                    }}
                    multiple
                >
                    {logicalValue.map((e) => (
                        <option selected>{e}</option>
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
                            ? (
                                  (props.displayMap &&
                                      logicalValue.map(
                                          (d) => props.displayMap[d]
                                      )) ||
                                  logicalValue
                              ).join(", ")
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
                            selectedItems={logicalValue}
                            onItemSelected={(option) => {
                                if (
                                    logicalValue.includes(
                                        option.key || option.label
                                    )
                                ) {
                                    setLogicalValue((prev) =>
                                        prev.filter(
                                            (v) =>
                                                v !==
                                                (option.key || option.label)
                                        )
                                    )
                                } else {
                                    setLogicalValue((prev) => [
                                        ...prev,
                                        option.key || option.label,
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
