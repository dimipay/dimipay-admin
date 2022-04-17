import { UseFormRegisterReturn } from "react-hook-form"
import React, { useEffect, useState } from "react"

import { clickWithSpace, useConsole } from "@/functions"
import { Regular, Token } from "@/typo"
import { Option } from "@/types"

import { DataView, Wrapper } from "./style"
import { SelectableList } from "./partial"
import { MiniInput } from "../MiniInput"

export const Dropdown: React.FC<{
    options: Option[]
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
    const [logicalValue, setValue] = useState(props.data || [])

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
                        console.log(props.hooker)
                        props.hooker.ref(r)
                    }}
                    multiple
                >
                    {props.options.map((value) => (
                        <option
                            selected={logicalValue.includes(
                                value.key || value.label
                            )}
                        >
                            {value.key || value.label}
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
                    <SelectableList
                        options={props.options}
                        itemLabelMap={props.displayMap}
                        selectedItems={logicalValue}
                        onItemSelected={(option) => {
                            if (
                                logicalValue.includes(
                                    option.key || option.label
                                )
                            ) {
                                setValue((prev) =>
                                    prev.filter(
                                        (v) =>
                                            v !== (option.key || option.label)
                                    )
                                )
                            } else {
                                setValue((prev) => [
                                    ...prev,
                                    option.key || option.label,
                                ])
                            }
                        }}
                    />
                )}
            </Wrapper>
        </label>
    )
}
