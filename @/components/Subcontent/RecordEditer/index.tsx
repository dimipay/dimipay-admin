import { Button, DividerLine, InlineForm } from "@/components"
import { Vexile } from "@haechi/flexile"
import { toast } from "react-toastify"
import { TableRecord } from "@/types"
import { Fragment } from "react"

import { NeoScheme } from "@/schemes"
import { table } from "@/functions"
import { Important } from "@/typo"
import { useLogic } from "./logic"
import { useRecoilValue } from "recoil"
import { selectedRowAtom } from "@/coil"

export const RecordEditer: React.FC<{
    scheme: NeoScheme
    data?: TableRecord
    onReloadRequested?(): void
    onSubmit?(data: Partial<TableRecord>): void
}> = (props) => {
    const formik = useLogic(props)

    return (
        <InlineForm onSubmit={formik.handleSubmit}>
            <Vexile gap={4}>
                {Object.entries(props.scheme.fields).map(([key, field]) => (
                    <field.EditComponent
                        key={key}
                        value={formik.values[key]}
                        field={field.field}
                        error={formik.errors[key]}
                        handlers={{
                            onBlur: formik.handleBlur,
                            onChange: formik.handleChange,
                        }}
                        name={key}
                        label={field.field.displayName}
                        disabled={
                            field.field.autoGenerative || field.field.readOnly
                        }
                        placeholder={field.field.placeholder}
                        setFieldValue={formik.setFieldValue}
                    />
                ))}
                <Button type="submit" block>
                    <Important white center>
                        {props.data ? "수정 사항 저장" : "새로 만들기"}
                    </Important>
                </Button>
            </Vexile>
        </InlineForm>
    )
}

export const ModifyRecord = (props: {
    scheme: NeoScheme
    onReloadRequested(): void
}) => {
    const selectedData = useRecoilValue(selectedRowAtom)
    if (!selectedData) return <></>

    return (
        <>
            <RecordEditer
                {...props}
                scheme={props.scheme}
                data={selectedData}
                onSubmit={async (data) => {
                    const generalizedData: Partial<TableRecord> =
                        Object.fromEntries(
                            Object.entries(data)
                                .filter(
                                    ([key]) =>
                                        key in props.scheme.fields &&
                                        !props.scheme.fields[key].field
                                            .autoGenerative
                                )
                                .map(([key, value]) => [
                                    key,
                                    value === null ? undefined : value,
                                ])
                                .filter((e) => e[0])
                        )

                    const res = await table[props.scheme.slug].PATCH({
                        id: selectedData.id,
                        data: generalizedData,
                    })

                    if (res.id) {
                        toast("내용을 수정했어요", {
                            type: "success",
                        })
                    }

                    props.onReloadRequested?.()
                }}
            />
            {props.scheme.panelComponents?.map((Component) => (
                <Fragment key={Component.name}>
                    <DividerLine />
                    <Component
                        scheme={props.scheme}
                        record={selectedData}
                        reload={props.onReloadRequested}
                    />
                </Fragment>
            ))}
        </>
    )
}
