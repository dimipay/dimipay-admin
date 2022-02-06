import { eyeIcon, trashIcon } from "@/assets"
import { LoadSVG, MiniInput } from "@/components"
import { MiniSelect } from "@/components/MiniSelect"
import { korOperatorMap, PartialFilter, Scheme } from "@/types"
import { Regular } from "@/typo"
import { Hexile } from "@haechi/flexile"
import { useEffect, useState } from "react"
import { ItemWrapper } from "./style"

export const useFilter = (scheme: Scheme) => {
    const [filter, setFilter] = useState<PartialFilter[]>([])

    useEffect(() => {}, [])

    return {
        filter,
        addFilter(key: string) {
            setFilter((prev) => [...prev, [key, undefined, undefined]])
        },
        element: (
            <Hexile gap={2}>
                {filter.map(([key, operator, value], index) => (
                    <ItemWrapper padding={4} gap={2} y="center">
                        <LoadSVG
                            src={eyeIcon}
                            width={4}
                            height={4}
                            alt="필터 적용 해제 버튼"
                        />
                        <LoadSVG
                            src={trashIcon}
                            width={4}
                            height={4}
                            alt="필터 삭제 버튼"
                        />
                        <Regular>{scheme?.fields?.[key].display.이가}</Regular>
                        <MiniInput
                            onChange={(enteredValue) => {
                                setFilter((prev) => [
                                    ...prev.slice(0, index),
                                    [key, operator, enteredValue],
                                    ...prev.slice(index + 1),
                                ])
                            }}
                            placeholder="비교값"
                        />
                        <Regular>
                            {value && operator
                                ? korOperatorMap[operator].appender?.(
                                      value.toString()
                                  )
                                : "..."}
                        </Regular>
                        <MiniSelect
                            onChange={(selectedOperator) => {
                                setFilter((prev) => [
                                    ...prev.slice(0, index),
                                    [key, selectedOperator, undefined],
                                    ...prev.slice(index + 1),
                                ])
                            }}
                            placeholder="조건"
                            selected={
                                operator && korOperatorMap[operator].display
                            }
                            options={Object.entries(korOperatorMap).map(
                                ([key, value]) => ({
                                    label: value.display,
                                    key,
                                })
                            )}
                        />
                    </ItemWrapper>
                ))}
            </Hexile>
        ),
    }
}
