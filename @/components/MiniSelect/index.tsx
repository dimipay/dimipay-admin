import { downArrowIcon } from "@/assets"
import { Option } from "@/types"
import { Regular } from "@/typo"
import { Hexile } from "@haechi/flexile"
import React, { useState } from "react"
import { LoadSVG } from ".."
import { SelectableList } from "../Dropdown/partial"
import { ListWrapper, LogicalInput, Wrapper } from "./style"

export const MiniSelect: React.FC<{
    options: Option[]
    selected?: string
    onChange: (value: string) => void
    placeholder?: string
}> = (props) => {
    const [isMenuOpened, setMenuOpened] = useState(false)

    return (
        <Wrapper onClick={() => setMenuOpened(true)}>
            <Hexile gap={2}>
                <Regular accent>{props.selected || props.placeholder}</Regular>
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
                        selectedItems={[props.selected]}
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
