import { HitSlop, LoadSVG, MiniInput } from "@/components"
import { korOperatorMap, PartialFilter } from "@/types"
import { MiniSelect } from "@/components/MiniSelect"
import { eyeIcon, trashIcon } from "@/assets"
import { NeoField } from "@/fields"
import { Regular } from "@/typo"

import { ItemWrapper } from "./style"

export interface FilterWithDisablity {
    content: PartialFilter
    disabled: boolean
}

export const FilterItem: React.FC<{
    filter: PartialFilter
    disabled: boolean
    field: NeoField<any>
    updateFilter: (content: FilterWithDisablity | null) => void
}> = ({ filter: [key, operator, value], ...props }) => {
    return (
        <ItemWrapper
            padding={4}
            gap={2}
            y="center"
            keepsize
            disabled={props.disabled}
        >
            <HitSlop
                onClick={() =>
                    props.updateFilter({
                        content: [key, operator, value],
                        disabled: !props.disabled,
                    })
                }
            >
                <LoadSVG
                    src={eyeIcon}
                    width={4}
                    height={4}
                    alt="필터 적용 해제 버튼"
                />
            </HitSlop>
            <HitSlop onClick={() => props.updateFilter(null)}>
                <LoadSVG
                    src={trashIcon}
                    width={4}
                    height={4}
                    alt="필터 삭제 버튼"
                />
            </HitSlop>
            <Regular>{props.field.field.displayName.이가}</Regular>
            <MiniInput
                onChange={(enteredValue) => {
                    props.updateFilter({
                        content: [
                            key,
                            operator,
                            props.field.format?.beforeSave?.(enteredValue) ??
                                enteredValue,
                        ],
                        disabled: props.disabled,
                    })
                }}
                placeholder="비교값"
            />
            <Regular>
                {value &&
                    (operator
                        ? korOperatorMap[operator].appender?.(value.toString())
                        : "...")}
            </Regular>
            <MiniSelect
                onChange={(selectedOperator) => {
                    props.updateFilter({
                        content: [key, selectedOperator, value],
                        disabled: props.disabled,
                    })
                }}
                placeholder="조건"
                selected={
                    operator
                        ? {
                              label: korOperatorMap[operator].display,
                          }
                        : undefined
                }
                options={Object.entries(korOperatorMap).map(([key, value]) => ({
                    label: value.display,
                    key,
                }))}
            />
        </ItemWrapper>
    )
}
