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
    Option,
} from "@/types"
import { useFormik } from "formik"
import { useEffect } from "react"
import { toast } from "react-toastify"

export const convertToStorageType = (
    field: Field,
    value: DataValue | Option[],
    isUpdate: boolean = false
): [string | undefined, unknown | undefined] => {
    if (field.typeOption.type === "number") return [undefined, Number(value)]

    if (field.typeOption.type === "date") {
        return [
            undefined,
            (value && new Date(value.toString()).toISOString()) || undefined,
        ]
    }

    if (field.typeOption.type === "relation-single") {
        if (!value)
            return [
                undefined,
                {
                    connect: [],
                },
            ]

        console.log("값은...", value)

        const relationTargetKey = (value as unknown as Option[])[0]

        return [
            undefined,
            {
                connect: {
                    id: relationTargetKey.key || relationTargetKey.label,
                },
            },
        ]
    }

    if (field.typeOption.type === "relation-multiple") {
        const relationTargetScheme = TABLES.find(
            (e) =>
                e.tableName === (field.typeOption as SingleRelationField).target
        )

        if (!relationTargetScheme) return [undefined, undefined]

        const keys = value as unknown as Option[]

        const relationConnectKey = isUpdate ? "set" : "connect"

        if (!value || !(value as string[]).length)
            return [
                undefined,
                {
                    [relationConnectKey]: [],
                },
            ]

        // const isUUIDPk =
        //     relationTargetScheme.isUUIDPk ||
        //     keys.some((data) => data.match(/[A-z]/))

        const typedIds = keys.map((data) => +(data.key || data.label))

        // if (field.typeOption.flattenField) {
        //     return [field.typeOption.flattenField, typedIds]
        // }

        return [
            undefined,
            {
                [relationConnectKey]: typedIds.map((e) => ({
                    id: e,
                })),
            },
        ]
    }

    return [undefined, value]
}

// DB에 저장되어 있는 값들을 보여주고 수정할 수 있게 형식을 변환하는 함수
export const storedDataToEditableValue = (
    data: TableRecord,
    scheme: Scheme
) => {
    const sanitized = {
        ...data,
        ...Object.fromEntries(
            Object.entries(data)
                .map(([key, value]) => {
                    if (
                        scheme.computedFields &&
                        Object.keys(scheme.computedFields).includes(key)
                    )
                        return [key, value]

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
                            (value as Relation)?.target.map(e => ({
                                key: e.id,
                                label: e.displayName
                            })),
                        ]
                    }

                    return []
                })
                .filter((e) => e[0])
                .filter(Boolean)
        ),
    }

    console.log("Sanitized", sanitized)

    return sanitized
}

export const useLogic = (props: {
    scheme: Scheme
    data?: TableRecord
    onReloadRequested?(): void
}) => {
    const formik = useFormik<Partial<TableRecord>>({
        initialValues: props.data ? storedDataToEditableValue(props.data, props.scheme) : {},
        validateOnChange: true,
        enableReinitialize: true,
        async validate(data) {
            const errors: Record<string, string> = {}

            for (const key in data) {

                if (!(key in props.scheme.fields)) continue
                const validator = props.scheme.fields[key].validateFunc

                if (validator) {
                    const error = await validator(data[key])
                    if (typeof error === "string") errors[key] = error
                }
            }

            return errors
        },
        onSubmit: async (data) => {
            const generalizedData = Object.fromEntries(
                Object.entries(data)
                    .filter(
                        ([key, value]) =>
                            key in props.scheme.fields &&
                            !props.scheme.fields[key].autoGenerative &&
                            !(value === undefined || value === null)
                    )
                    .map(([key, value]) => {
                        const field: Field = props.scheme.fields[key]
                        if (props.data && field.readOnly)
                            return [undefined, undefined]
                        const [typedKey = key, typedValue] = convertToStorageType(
                            field,
                            value,
                            !!props.data
                        )
                        return [typedKey, typedValue]
                    })
                    .filter((e) => e[0])
            )

            if (props.data) {
                const res = await table[props.scheme.tableName].PATCH({
                    id: props.data.id,
                    data: generalizedData,
                })
                if (res.id) {
                    toast.success("바꾼 내용을 저장했어요")
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
    })

    useEffect(() => {
        console.log(
            "Form value updated!",
            formik.values
        )
    }, [
        formik.values
    ])

    return formik
}
