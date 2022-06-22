import { Button, DividerLine, InlineForm } from "@/components"
import { Scheme, TableRecord } from "@/types"
import { Vexile } from "@haechi/flexile"
import { Fragment, useEffect } from "react"

import { PropertyEditer } from "./partial"
import { Important } from "@/typo"
import { useLogic } from "./logic"

export const RecordEditer: React.FC<{
    scheme: Scheme
    data?: TableRecord
    onReloadRequested?(): void
}> = (props) => {
    const formik = useLogic(props)

    return (
        <InlineForm onSubmit={formik.handleSubmit}>
            <Vexile gap={4}>
                {Object.entries(props.scheme.fields).map(([key]) => (
                    <PropertyEditer
                        key={key}
                        name={key}
                        handlers={{
                            onBlur: formik.handleBlur,
                            onChange: formik.handleChange,
                        }}
                        field={props.scheme.fields[key]}
                        error={formik.errors[key]}
                        setFieldValue={formik.setFieldValue}
                        value={formik.values[key]}
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
                    <Component
                        scheme={props.scheme}
                        record={props.data}
                        reload={props.onReloadRequested}
                    />
                </Fragment>
            ))}
        </>
    )
}
