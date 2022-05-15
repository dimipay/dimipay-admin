import { Vexile, Hexile } from "@haechi/flexile"
import { clickWithSpace } from "@/functions"
import { ColorBubble } from "@/components"
import { Description } from "@/typo"
import { DividerLine } from ".."
import { Option } from "@/types"
import { Item } from "./style"

export const SelectableList: React.FC<{
    options: Option[]
    selectedOptions: Option[]
    itemLabelMap?: Record<string | number, string>
    onItemSelected?: (clicked: Option) => void
    style?: React.CSSProperties
    coDisplayKey?: boolean
}> = (props) => {
    return (
        <Vexile style={props.style}>
            {props.options.map((option) => (
                <>
                    <Item
                        tabIndex={0}
                        onKeyDown={clickWithSpace}
                        x="space"
                        padding={3}
                        selected={props.selectedOptions.some(
                            (e) =>
                                e.key === option.key || e.label === option.label
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
