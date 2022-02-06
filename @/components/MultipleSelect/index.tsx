import { UseFormRegisterReturn } from "react-hook-form"
import React, { useEffect, useState } from "react"
import { Hexile, Vexile } from "@haechi/flexile"

import { Description, Regular, Token } from "@/typo"
import { clickWithSpace, useConsole } from "@/functions"
import { Option } from "@/types"

import { DataView, Item, Wrapper } from "./style"
import { ColorBubble, SelectableList } from "./partial"
import { DividerLine } from ".."

export const MultipleSelect: React.FC<{
    options: Option[]
    data?: (string | number)[]
    name: string
    placeholder: string
    hooker: UseFormRegisterReturn
    displayMap?: Record<string | number, string>
    error?: string
    disabled?: boolean
}> = (props) => {
    const [opened, setOpened] = useState(false)
    const [logicalValue, setValue] = useState(props.data || [])
    useConsole(
        "SELECTIVE",
        props.options.map((value) =>
            logicalValue.includes(value.key || value.label)
        )
    )

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
                onFocus={props.disabled ? undefined : () => setOpened(true)}
                onBlur={props.disabled ? undefined : () => setOpened(false)}
                tabIndex={props.disabled ? -1 : 0}
                disabled={!!props.disabled}
            >
                <select
                    style={{ display: "none" }}
                    name={props.hooker.name}
                    ref={(r) => {
                        logicalSelect.current = r
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
