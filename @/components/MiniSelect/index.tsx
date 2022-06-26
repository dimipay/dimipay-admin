import { SelectableList } from "../Dropdown/partial"
import { ListWrapper, Wrapper } from "./style"
import { ColorBubble, LoadSVG } from ".."
import { downArrowIcon } from "@/assets"
import { Hexile } from "@haechi/flexile"
import React, { useState } from "react"
import { Option } from "@/types"
import { Regular } from "@/typo"

export const MiniSelect: React.FC<{
    options: Option[]
    selected?: Option
    onChange: (value: string) => void
    placeholder?: string
}> = (props) => {
    const [isMenuOpened, setMenuOpened] = useState(false)

    return (
        <Wrapper onClick={() => setMenuOpened(true)}>
            <Hexile gap={2} y="center">
                {props.selected?.color && (
                    <ColorBubble color={props.selected.color} />
                )}
                <Regular accent>
                    {props.selected?.label ||
                        props.selected?.key ||
                        props.placeholder}
                </Regular>
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
                        selectedOptions={props.selected && [props.selected]}
                        onItemSelected={(clicked) => {
                            setMenuOpened(false)
                            props.onChange(clicked.key as string)
                        }}
                        coDisplayKey
                    />
                </ListWrapper>
            )}
        </Wrapper>
    )
}
