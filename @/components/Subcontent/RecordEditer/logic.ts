// Input으로 들어온 값을 Prisma로 저장할 수 있게 형식을 변환하는 함수

import { TABLES } from "@/constants"
import { table } from "@/functions"
import {
    DataValue,
    SingleRelationField,
    TableRecord,
    Scheme,
    Relation,
    Field,
} from "@/types"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

export const convertToStorageType = (field: Field, value: DataValue) => {
    if (field.typeOption.type === "number") return Number(value)

    if (field.typeOption.type === "date") {
        return (value && new Date(value.toString()).toISOString()) || undefined
    }

    if (field.typeOption.type === "relation-single") {
        if (!value)
            return {
                set: [],
            }

        const relationTargetKey = (value as string[] | number[])[0]
        const relationTargetScheme = TABLES.find(
            (e) =>
                e.tableName === (field.typeOption as SingleRelationField).target
        )

        if (!relationTargetScheme) return []

        return {
            connect: {
                id:
                    relationTargetScheme.isUUIDPk ||
                    (typeof relationTargetKey === "string" &&
                        relationTargetKey?.match(/[A-z]/))
                        ? relationTargetKey
                        : +relationTargetKey,
            },
        }
    }

    if (field.typeOption.type === "relation-multiple") {
        const relationTargetScheme = TABLES.find(
            (e) =>
                e.tableName === (field.typeOption as SingleRelationField).target
        )

        if (!relationTargetScheme) return []

        const keys = value as string[]

        if (!value || !(value as string[]).length)
            return {
                set: [],
            }

        const isUUIDPk =
            relationTargetScheme.isUUIDPk ||
            keys.every((data) => data.match(/[A-z]/))

        return {
            connect: {
                id: isUUIDPk ? keys : keys.map((key) => +key),
            },
        }
    }

    return value
}

// DB에 저장되어 있는 값들을 보여주고 수정할 수 있게 형식을 변환하는 함수
export const storedDataToEditableValue = (
    data: TableRecord,
    scheme: Scheme
) => {
    return {
        ...data,
        ...Object.fromEntries(
            Object.entries(data)
                .map(([key, value]) => {
                    if (scheme.fields[key].typeOption.type === "date") {
                        return [
                            key,
                            value
                                ? new Date(
                                      3240 * 10000 + +new Date(value.toString())
                                  )
                                      .toISOString()
                                      .slice(0, -1)
                                : undefined,
                        ]
                    }

                    if (
                        scheme.fields[key].typeOption.type.startsWith(
                            "relation"
                        )
                    ) {
                        return [
                            key,
                            (value as Relation)?.target.map((e) => e.id),
                        ]
                    }

                    return []
                })
                .filter((e) => e[0])
                .filter(Boolean)
        ),
    }
}

export const useLogic = (props: {
    scheme: Scheme
    data?: TableRecord
    onReloadRequested?(): void
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TableRecord>({
        defaultValues:
            props.data && storedDataToEditableValue(props.data, props.scheme),
        reValidateMode: "onChange",
    })

    useEffect(() => {
        if (!props.data) return

        const sanitized = storedDataToEditableValue(props.data, props.scheme)
        for (const key in sanitized) {
            setValue(key, sanitized[key])
        }
    }, [props.data])

    const onSubmit: SubmitHandler<TableRecord> = async (data) => {
        const generalizedData = Object.fromEntries(
            Object.entries(data)
                .filter(
                    ([key, value]) =>
                        !props.scheme.fields[key].autoGenerative &&
                        !(value === undefined || value === null)
                )
                .map(([key, value]) => {
                    const field: Field = props.scheme.fields[key]

                    const typedValue = convertToStorageType(field, value)

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
                toast("바꾼 내용을 저장했어요", {
                    type: "success",
                })
                props.onReloadRequested?.()
            }
        } else {
            const res = await table[props.scheme.tableName].POST({
                data: generalizedData,
            })

            if (res.id) {
                toast("새 항목을 만들었어요", {
                    type: "success",
                })
                props.onReloadRequested?.()
            }
        }

        return true
    }

    return {
        register,
        onSubmit: handleSubmit(onSubmit),
        errors,
    }
}