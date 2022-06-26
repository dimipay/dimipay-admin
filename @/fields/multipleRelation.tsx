import { FieldComponent, FieldFunction, FieldProps } from "."
import { MultipleRelation, Option, SLUG } from "@/types"
import { Description, Regular } from "@/typo"
import { useCallback, useMemo } from "react"
import { Vexile } from "@haechi/flexile"
import { Dropdown } from "@/components"
import { table } from "@/functions"

export interface MultipleRelationFieldFactoryProps
    extends FieldProps<MultipleRelation> {
    targetTable?: SLUG
    nameField?: string
}

export const createRelationOptionRetriever =
    (targetTable?: SLUG, nameField?: string) => async (keyword?: string) => {
        if (!targetTable || !nameField) return []

        const relationData = (
            await table[targetTable].GET({
                amount: 5,
                filter: keyword
                    ? [[nameField, "contains", keyword]]
                    : undefined,
            })
        ).map((row) => ({
            label: row[nameField!] as string,
            key: row.id,
            color: row.color as string,
        }))

        return relationData
    }

const MultipleRelationComponent: FieldComponent<
    MultipleRelation,
    MultipleRelationFieldFactoryProps
> = (props) => {
    const selected: Option[] = useMemo(
        () =>
            props.value
                ? props.value.target.map((e) => ({
                      key: e.id,
                      label: e.displayName,
                  }))
                : [],
        [props.value]
    )

    const relationOptionRetriever = useCallback(
        createRelationOptionRetriever(
            props.field.targetTable,
            props.field.nameField
        ),
        [props.field]
    )

    return (
        <Vexile gap={1}>
            <Dropdown
                value={selected}
                optionsRetriever={relationOptionRetriever}
                placeholder={props.field.placeholder}
                name={props.name}
                label={props.field.displayName}
                onChange={(e) => {
                    props.setFieldValue?.(props.name, {
                        slug: props.name,
                        target: e.length
                            ? e.map((e) => ({
                                  id: e.key,
                                  displayName: e.label,
                              }))
                            : null,
                    })
                }}
            />
            {props.field.description && (
                <Description>{props.field.description}</Description>
            )}
        </Vexile>
    )
}

export const multipleRelation: FieldFunction<
    MultipleRelation,
    MultipleRelationFieldFactoryProps
> = (field) => ({
    field,
    EditComponent: MultipleRelationComponent,
    format: {
        beforeSave(value, _, isUpdate) {
            const relKey = isUpdate ? "set" : "connect"
            console.log(isUpdate)
            return {
                [relKey]: value.target.map((e) => ({
                    id: e.id,
                })),
            }
        },
    },
    type: "MULTIPLE_RELATION",
    TableComponent({ value }) {
        if (!value?.target) return <></>
        console.log(value.target)
        return (
            <Regular>
                {value.target.map((e) => e.displayName).join(", ")}
            </Regular>
        )
    },
})
