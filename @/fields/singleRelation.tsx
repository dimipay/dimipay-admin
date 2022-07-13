import { ColorBubble, Dropdown } from "@/components"
import { Option, SingleRelation, SLUG } from "@/types"
import { Description, Regular } from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"
import { useMemo, useCallback } from "react"
import { FieldComponent, FieldFunction, FieldProps } from "."
import { createRelationOptionRetriever } from "./multipleRelation"

export interface SingleRelationFieldFactoryProps
    extends FieldProps<SingleRelation> {
    targetTable?: SLUG
    nameField?: string
}

const SingleRelationComponent: FieldComponent<
    SingleRelation,
    SingleRelationFieldFactoryProps
> = props => {
    const selected: Option[] = useMemo(() => {
        return props.value?.target
            ? [
                  {
                      key: props.value.target.id,
                      label: props.value.target.displayName,
                  },
              ]
            : []
    }, [props.value])

    const relationOptionRetriever = useCallback(
        createRelationOptionRetriever(
            props.field.targetTable,
            props.field.nameField,
        ),
        [props.field],
    )

    return (
        <Vexile gap={1}>
            <Dropdown
                value={selected}
                optionsRetriever={relationOptionRetriever}
                placeholder={props.field.placeholder}
                name={props.name}
                label={props.field.displayName}
                onChange={e => {
                    props.setFieldValue?.(
                        props.name,
                        e.length
                            ? {
                                  slug: props.name,
                                  target: {
                                      id: (e[1] || e[0]).key,
                                      displayName: (e[1] || e[0]).label,
                                  },
                              }
                            : undefined,
                    )
                }}
            />
            {props.field.description && (
                <Description>{props.field.description}</Description>
            )}
        </Vexile>
    )
}

export const singleRelation: FieldFunction<
    SingleRelation,
    SingleRelationFieldFactoryProps
> = field => ({
    field,
    EditComponent: SingleRelationComponent,
    TableComponent({ value }) {
        if (!value) return <></>
        return (
            <Hexile gap={2} y="center">
                {value.target.color && (
                    <ColorBubble color={value.target.color} />
                )}
                <Regular>{value.target.displayName}</Regular>
            </Hexile>
        )
    },
    type: "SINGLE_RELATION",
    format: {
        beforeSave(value, _, isUpdate) {
            if (!value && isUpdate)
                return {
                    disconnect: true,
                }

            if (!value) return undefined

            return {
                connect: {
                    id: value.target.id,
                },
            }
        },
        parseFromString(value) {
            return {
                slug: field.targetTable!,
                target: {
                    displayName: value,
                    id: Math.random() * 1000,
                },
            }
        },
    },
})
