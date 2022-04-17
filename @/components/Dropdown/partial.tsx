import { Vexile, Hexile } from "@haechi/flexile"
import { ColorBubble } from "@/components"
import { Description } from "@/typo"
import { Option } from "@/types"
import { DividerLine } from ".."
import { Item, SearchInput, Searhbox } from "./style"
import { clickWithSpace } from "@/functions"
import { LoadSVG } from "../LoadSVG"
import { searchIcon } from "@/assets"

export const SelectableList: React.FC<{
    options: Option[]
    selectedItems: (string | number)[]
    itemLabelMap?: Record<string | number, string>
    onItemSelected?: (clicked: Option) => void
    style?: React.CSSProperties
    coDisplayKey?: boolean
}> = (props) => {
    return (
        <Vexile
            style={props.style}
            onClick={(e) => {
                e.stopPropagation()
            }}
        >
            <Searhbox padding={3} y="center" gap={2}>
                <LoadSVG
                    alt="검색 아이콘"
                    src={searchIcon}
                    height={3}
                    width={3}
                />
                <SearchInput onKeyDown={(e) => e.stopPropagation()} />
            </Searhbox>
            {props.options.map((option) => (
                <>
                    <Item
                        tabIndex={0}
                        onKeyDown={clickWithSpace}
                        x="space"
                        padding={3}
                        selected={props.selectedItems.includes(
                            option.key || option.label
                        )}
                        onClick={(e) => {
                            e.stopPropagation()
                            props.onItemSelected(option)
                        }}
                    >
                        <Hexile gap={2} y="center">
                            {option.color && (
                                <ColorBubble color={option.color} />
                            )}
                            <Description dark={1}>
                                {props.itemLabelMap?.[option.label] ||
                                    option.label}{" "}
                                {props.coDisplayKey && `(${option.key})`}
                            </Description>
                        </Hexile>
                    </Item>
                    <DividerLine />
                </>
            ))}
        </Vexile>
    )
}
