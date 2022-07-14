import { SelectableList } from "../Dropdown/partial"
import { ListWrapper, Wrapper } from "./style"
import { ColorBubble, LoadSVG } from ".."
import { downArrowIcon } from "@/assets"
import { Hexile } from "@haechi/flexile"
import React, { useEffect, useMemo, useState } from "react"
import { Option } from "@/types"
import { Regular } from "@/typo"

export const InlineSelect: React.FC<{
    options: Option[]
    selected?: Option
    selectedKey?: string
    onChange: (value: string) => void
    placeholder?: string
    coDisplayKey?: boolean
}> = props => {
    const [isMenuOpened, setMenuOpened] = useState(false)

    useEffect(() => {
        const bodyClickHandler = () => {
            if (isMenuOpened) setMenuOpened(false)
        }

        document.body.addEventListener("click", bodyClickHandler)

        return () => {
            document.body.removeEventListener("click", bodyClickHandler)
        }
    }, [isMenuOpened])

    const selectedOption = useMemo(() => {
        if (props.selected)
            return props.options.find(option =>
                props.selected
                    ? option.key && option.key === props.selected.key
                    : !option.key && option.label === props.selected!.label,
            )

        if (props.selectedKey)
            return props.options.find(
                option => option.key === props.selectedKey,
            )
    }, [props.selected, props.selectedKey])

    return (
        <Wrapper
            onClick={() => {
                setMenuOpened(true)
            }}>
            <Hexile gap={2} y="center" x="space">
                {props.selected?.color && (
                    <ColorBubble color={props.selected.color} />
                )}
                <Hexile gap={1}>
                    <Regular>
                        {selectedOption?.label ||
                            selectedOption?.key ||
                            props.placeholder ||
                            "선택해주세요"}
                    </Regular>
                    {selectedOption?.icon}
                </Hexile>

                <LoadSVG
                    alt="조건 목록 펼치기 아이콘"
                    src={downArrowIcon}
                    height={3}
                    width={3}
                />
            </Hexile>
            {isMenuOpened && (
                <ListWrapper>
                    <SelectableList
                        options={props.options}
                        selectedOptions={
                            props.selected
                                ? [props.selected]
                                : props.selectedKey
                                ? [
                                      {
                                          key: props.selectedKey,
                                          label:
                                              props.options.find(
                                                  e =>
                                                      e.key ===
                                                      props.selectedKey,
                                              )?.label || "",
                                      },
                                  ]
                                : []
                        }
                        onItemSelected={clicked => {
                            setMenuOpened(false)
                            props.onChange(clicked.key as string)
                        }}
                        coDisplayKey={props.coDisplayKey}
                    />
                </ListWrapper>
            )}
        </Wrapper>
    )
}
