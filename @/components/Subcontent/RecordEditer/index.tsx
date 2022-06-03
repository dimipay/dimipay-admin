import { Button, DividerLine, InlineForm } from "@/components"
import { table } from "@/functions"
import { loadRedis } from "@/storage"
import {
    DataValue,
    MultipleRelationField,
    Relation,
    Scheme,
    TableRecord,
} from "@/types"
import { Important } from "@/typo"
import { Vexile } from "@haechi/flexile"
import { Fragment, useEffect } from "react"
import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { PropertyEditer } from "./partial"

const relationSanitizer = (data: TableRecord) => {
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

export const RecordEditer = (props: {
    data: TableRecord
    scheme: Scheme
    onReloadRequested(): void
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TableRecord>({
        defaultValues: relationSanitizer(props.data),
        reValidateMode: "onChange",
    })

    useEffect(() => {
        const sanitized = relationSanitizer(props.data)
        for (const key in sanitized) {
            setValue(key, sanitized[key])
        }
    }, [props.data])

    const onSubmit: SubmitHandler<TableRecord> = async (data) => {
        const res = await table[props.scheme.tableName].PATCH({
            id: props.data.id,
            data: Object.fromEntries(
                Object.entries(data)
                    .filter(
                        ([column]) =>
                            column in props.scheme.fields &&
                            props.scheme.fields[column].readOnly !== true
                    )
                    .map(([key, value]) => [
                        key,
                        props.scheme.fields[key].typeOption.type === "number"
                            ? Number(value)
                            : value,
                    ])
            ),
        })

        if (res.id) {
            toast("수정사항을 저장했어요", {
                type: "success",
            })
            props.onReloadRequested()
        }
    }

    return (
        <>
            <InlineForm onSubmit={handleSubmit(onSubmit)}>
                <Vexile gap={4}>
                    {Object.entries(props.data)
                        .filter(([column]) => column in props.scheme.fields)
                        .map(([key, data]) => (
                            <PropertyEditer
                                hooker={register(key, {
                                    validate:
                                        props.scheme.fields[key].validateFunc,
                                })}
                                error={errors[key] as FieldError}
                                data={data}
                                field={props.scheme.fields[key]}
                            />
                        ))}
                    <Button block>
                        <Important white center>
                            저장
                        </Important>
                    </Button>
                </Vexile>
            </InlineForm>
            {props.scheme.panelComponents?.map((Component) => (
                <Fragment key={Component.name}>
                    <DividerLine />
                    <Component scheme={props.scheme} record={props.data} />
                </Fragment>
            ))}
        </>
    )
}
