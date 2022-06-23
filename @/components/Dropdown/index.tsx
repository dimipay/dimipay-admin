import React, { useEffect, useState } from "react"

import { clickWithSpace } from "@/functions"
import { Regular, Token } from "@/typo"
import { Option } from "@/types"

import { DataView, SearchInput, Searhbox, Wrapper } from "./style"
import { SelectableList } from "./partial"
import { searchIcon } from "@/assets"
import { LoadSVG } from "../LoadSVG"
import { toast } from "react-toastify"
import { SetFieldValueFunction } from "../Subcontent/RecordEditer/partial"

export const Dropdown: React.FC<{
    options?: Option[]
    optionsRetriever?: (query?: string) => Promise<Option[]>
    value: Option[]
    name: string
    label: string
    placeholder: string
    displayMap?: Record<string | number, string>
    error?: string
    disabled?: boolean
    maxSelectAmount?: number
    setFieldValue?: SetFieldValueFunction
}> = (props) => {
    const [loadedOptions, setLoadedOptions] = useState<Option[]>(
        props.options || []
    )
    const [searchQuery, setSearchQuery] = useState<string>()
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        console.log("이게 옴", props.name, props.value)
    }, [props.value])

    useEffect(() => {
        if (props.optionsRetriever) {
            props.optionsRetriever(searchQuery).then((options) => {
                setLoadedOptions(options)
            })
        }
    }, [searchQuery])

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
                <DataView
                    gap={1.5}
                    padding={3}
                    hasError={!!props.error}
                    disabled={!!props.disabled}
                >
                    <Token>{props.label}</Token>
                    <Regular dark={props.value && props.value.length ? 1 : 3}>
                        {props.value?.length
                            ? props.value
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
                            selectedOptions={props.value}
                            onItemSelected={(option) => {
                                if (
                                    props.value?.some(
                                        (e) =>
                                            e.key === option.key ||
                                            e.label === option.label
                                    )
                                ) {
                                    props.setFieldValue?.(
                                        props.name,
                                        props.value.filter(
                                            (v) =>
                                                !(
                                                    v.key === option.key ||
                                                    v.label === option.label
                                                )
                                        )
                                    )
                                } else {
                                    if (
                                        props.maxSelectAmount ===
                                        props.value?.length
                                    ) {
                                        toast.info(
                                            `${props.label.은는} 최대 ${props.maxSelectAmount}개 까지 선택할 수 있어요`
                                        )
                                        return
                                    }
                                    props.setFieldValue?.(props.name, [
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
