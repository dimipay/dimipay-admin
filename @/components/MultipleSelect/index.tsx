import { UseFormRegisterReturn } from "react-hook-form"
import React, { useEffect, useState } from "react"
import { Hexile, Vexile } from "@haechi/flexile"

import { Description, Regular, Token } from "@/typo"
import { clickWithSpace, useConsole } from "@/functions"
import { Option } from "@/types"

import { DataView, Item, Wrapper } from "./style"
import { ColorBubble } from "./partial"
import { DividerLine } from ".."

export const MultipleSelect: React.FC<{
    options: Option[]
    data: (string | number)[]
    name: string
    placeholder: string
    hooker: UseFormRegisterReturn
    displayMap?: Record<string | number, string>
    error?: string
}> = (props) => {
    const [opened, setOpened] = useState(false)
    const [logicalValue, setValue] = useState(props.data)
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
                onFocus={() => setOpened(true)}
                onBlur={() => setOpened(false)}
                tabIndex={0}
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
                <DataView gap={1.5} padding={3} hasError={!!props.error}>
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
                        <Vexile>
                            {props.options.map((option) => (
                                <>
                                    <Item
                                        x="space"
                                        padding={3}
                                        selected={logicalValue.includes(
                                            option.key || option.label
                                        )}
                                        onClick={() => {
                                            if (
                                                logicalValue.includes(
                                                    option.key || option.label
                                                )
                                            ) {
                                                setValue((prev) =>
                                                    prev.filter(
                                                        (v) =>
                                                            v !==
                                                            (option.key ||
                                                                option.label)
                                                    )
                                                )
                                            } else {
                                                setValue((prev) => [
                                                    ...prev,
                                                    option.key || option.label,
                                                ])
                                            }
                                        }}
                                    >
                                        <Hexile gap={2} y="center">
                                            {option.color && (
                                                <ColorBubble
                                                    color={option.color}
                                                />
                                            )}
                                            <Description dark={1}>
                                                {props.displayMap?.[
                                                    option.label
                                                ] || option.label}
                                            </Description>
                                        </Hexile>
                                    </Item>
                                    <DividerLine />
                                </>
                            ))}
                        </Vexile>
                    </>
                )}
            </Wrapper>
        </label>
    )
}
