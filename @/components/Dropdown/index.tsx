import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { clickWithSpace } from "@/functions"
import { Regular, Token } from "@/typo"
import { searchIcon } from "@/assets"
import { Option } from "@/types"

import { DataView, SearchInput, Searhbox, Wrapper } from "./style"
import { SelectableList } from "./partial"
import { LoadSVG } from "../LoadSVG"

export const Dropdown: React.FC<{
    options?: Option[]
    optionsRetriever?: (query?: string) => Promise<Option[]>
    value: Option[]
    name: string
    label: string
    placeholder?: string
    displayMap?: Record<string | number, string>
    error?: string
    disabled?: boolean
    maxSelectAmount?: number
    onChange(item: Option[]): void
}> = props => {
    const [loadedOptions, setLoadedOptions] = useState<Option[]>(
        props.options || [],
    )
    const [searchQuery, setSearchQuery] = useState<string>()
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        if (props.optionsRetriever) {
            props.optionsRetriever(searchQuery).then(options => {
                setLoadedOptions(options)
            })
        }
    }, [searchQuery])

    return (
        <label>
            <Wrapper
                hasError={!!props.error}
                onKeyDown={clickWithSpace}
                onFocus={props.disabled ? undefined : e => setOpened(true)}
                onBlur={
                    props.disabled
                        ? undefined
                        : e => {
                              if (e.currentTarget.contains(e.relatedTarget))
                                  return
                              setOpened(false)
                          }
                }
                tabIndex={props.disabled ? -1 : 0}
                disabled={!!props.disabled}>
                <DataView
                    gap={1.5}
                    padding={3}
                    hasError={!!props.error}
                    disabled={!!props.disabled}>
                    <Token>{props.label}</Token>
                    <Regular dark={props.value && props.value.length ? 1 : 3}>
                        {props.value?.length
                            ? props.value.map(e => e.label || e.key).join(", ")
                            : props.placeholder}
                    </Regular>
                    {props.error && <Token color="error">{props.error}</Token>}
                </DataView>
                {opened && (
                    <>
                        <Searhbox padding={3} y="center" gap={2}>
                            <LoadSVG
                                alt="?????? ?????????"
                                src={searchIcon}
                                height={3}
                                width={3}
                            />
                            <SearchInput
                                placeholder="??????"
                                onKeyDown={e => e.stopPropagation()}
                                onChange={e => {
                                    setSearchQuery(() => e.target?.value)
                                }}
                            />
                        </Searhbox>
                        <SelectableList
                            options={loadedOptions}
                            itemLabelMap={props.displayMap}
                            selectedOptions={props.value}
                            onItemSelected={option => {
                                if (
                                    props.value?.some(
                                        e =>
                                            e.key === option.key ||
                                            e.label === option.label,
                                    )
                                ) {
                                    props.onChange?.(
                                        props.value.filter(
                                            v =>
                                                !(
                                                    v.key === option.key ||
                                                    v.label === option.label
                                                ),
                                        ),
                                    )
                                } else {
                                    if (
                                        props.maxSelectAmount ===
                                        props.value?.length
                                    ) {
                                        toast.info(
                                            `${props.label.??????} ?????? ${props.maxSelectAmount}??? ?????? ????????? ??? ?????????`,
                                        )
                                        return
                                    }
                                    props.onChange?.([
                                        ...props.value,
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
