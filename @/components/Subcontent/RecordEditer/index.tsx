import { Button, DividerLine, InlineForm } from "@/components"
import { TABLES } from "@/constants"
import { table } from "@/functions"
import {
    DataValue,
    Field,
    MultipleRelationField,
    Relation,
    Scheme,
    SingleRelationField,
    TableRecord,
} from "@/types"
import { Important } from "@/typo"
import { Vexile } from "@haechi/flexile"
import { Fragment, useEffect } from "react"
import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { PropertyEditer } from "./partial"

const dataTyper = (field: Field, value: DataValue) => {
    if (field.typeOption.type === "number") return Number(value)

    if (field.typeOption.type === "date") {
        return value && new Date(value.toString()).toISOString() && new Date(0)
    }

    return value
}

const relationToMultiselectOption = (data: TableRecord) => {
    return {
        ...data,
        ...Object.fromEntries(
            Object.entries(data)
                .map(([key, value]) => {
                    if (value instanceof Object)
                        return [
                            key,
                            (value as unknown as Relation).target.map(
                                (e) => e.id
                            ),
                        ]
                    return []
                })
                .filter((e) => e[0])
                .filter(Boolean)
        ),
    }
}

export const RecordEditer: React.FC<{
    scheme: Scheme
    data?: TableRecord
    onReloadRequested?(): void
}> = (props) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TableRecord>({
        defaultValues: props.data && relationToMultiselectOption(props.data),
        reValidateMode: "onChange",
    })

    useEffect(() => {
        if (!props.data) return

        const sanitized = relationToMultiselectOption(props.data)
        for (const key in sanitized) {
            setValue(key, sanitized[key])
        }
    }, [props.data])

    const onSubmit: SubmitHandler<TableRecord> = async (data) => {
        const generalizedData = Object.fromEntries(
            Object.entries(data)
                .filter(
                    ([key, value]) =>
                        !props.scheme.fields[key].autoGenerative && value
                )
                .map(([key, value]) => {
                    const field: Field = props.scheme.fields[key]

                    if (field.typeOption.type === "relation-single") {
                        if (!value)
                            return [
                                key,
                                {
                                    set: [],
                                },
                            ]

                        const relationTargetKey = (value as string[])[0]
                        const relationTargetScheme = TABLES.find(
                            (e) =>
                                e.tableName ===
                                (field.typeOption as SingleRelationField).target
                        )

                        if (!relationTargetScheme) return []

                        return [
                            key,
                            {
                                connect: {
                                    id:
                                        relationTargetScheme.isUUIDPk ||
                                        !relationTargetKey.match(/0-9/)
                                            ? relationTargetKey
                                            : +relationTargetKey,
                                },
                            },
                        ]
                    }

                    if (field.typeOption.type === "relation-multiple") {
                        if (!value || !(value as string[]).length)
                            return [
                                key,
                                {
                                    set: [],
                                },
                            ]

                        return [
                            key,
                            {
                                connect: {
                                    id: value,
                                },
                            },
                        ]
                    }

                    const typedValue = dataTyper(field, value)

                    return [key, typedValue]
                })
                .filter((e) => e[0])
        )

        if (props.data) {
            const res = await table[props.scheme.tableName].PATCH({
                id: props.data.id,
                data: generalizedData,
            })

            if (res.id) {
                toast("수정사항을 저장했어요", {
                    type: "success",
                })
                props.onReloadRequested?.()
            }
        } else {
            const res = await table[props.scheme.tableName].POST({
                data: generalizedData,
            })

            if (res.id) {
                toast("새 항목을 추가했어요", {
                    type: "success",
                })
                props.onReloadRequested?.()
            }
        }
    }

    return (
        <InlineForm onSubmit={handleSubmit(onSubmit)}>
            <Vexile gap={4}>
                {Object.entries(props.scheme.fields).map(([key]) => (
                    <PropertyEditer
                        hooker={register(key, {
                            validate: props.scheme.fields[key].validateFunc,
                            required:
                                !props.scheme.fields[key].autoGenerative &&
                                props.scheme.fields[key].required,
                        })}
                        newRegister={!!props.data}
                        error={errors[key] as FieldError}
                        field={props.scheme.fields[key]}
                    />
                ))}
                {/* {Object.entries(props.data)
                    .filter(([column]) => column in props.scheme.fields)
                    .map(([key, data]) => (
                        <PropertyEditer
                            hooker={register(key, {
                                validate: props.scheme.fields[key].validateFunc,
                            })}
                            error={errors[key] as FieldError}
                            data={data}
                            field={props.scheme.fields[key]}
                        />
                    ))} */}
                <Button block>
                    <Important white center>
                        {props.data ? "수정 사항 저장" : "새로 만들기"}
                    </Important>
                </Button>
            </Vexile>
        </InlineForm>
    )
}

export const ModifyRecord = (props: {
    data: TableRecord
    scheme: Scheme
    onReloadRequested(): void
}) => {
    return (
        <>
            <RecordEditer {...props} />
            {props.scheme.panelComponents?.map((Component) => (
                <Fragment key={Component.name}>
                    <DividerLine />
                    <Component scheme={props.scheme} record={props.data} />
                </Fragment>
            ))}
        </>
    )
}
