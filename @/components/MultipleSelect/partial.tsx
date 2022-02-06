import { Option } from "@/types"
import { Description } from "@/typo"
import { Vexile, Hexile } from "@haechi/flexile"
import { DividerLine } from ".."
import { Item } from "./style"

export const ColorBubble: React.FC<{ color: string }> = ({ color }) => (
    <div
        style={{
            width: "2rem",
            height: "2rem",
            backgroundColor: color,
            borderRadius: "2rem",
        }}
    />
)

export const SelectableList: React.FC<{
    options: Option[]
    selectedItems: (string | number)[]
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
