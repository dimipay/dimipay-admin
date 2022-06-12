import { Button, DividerLine, InlineForm } from "@/components"
import { Scheme, TableRecord } from "@/types"
import { FieldError } from "react-hook-form"
import { Vexile } from "@haechi/flexile"
import { Fragment } from "react"

import { PropertyEditer } from "./partial"
import { Important } from "@/typo"
import { useLogic } from "./logic"

export const RecordEditer: React.FC<{
    scheme: Scheme
    data?: TableRecord
    onReloadRequested?(): void
}> = (props) => {
    const logics = useLogic(props)

    return (
        <InlineForm onSubmit={logics.onSubmit}>
            <Vexile gap={4}>
                {Object.entries(props.scheme.fields).map(([key, value]) => (
                    <PropertyEditer
                        hooker={logics.register(key, {
                            validate: value.validateFunc,
                            required: !value.autoGenerative && value.required,
                        })}
                        data={
                            value.typeOption.type.startsWith("relation")
                                ? props.data?.[key]
                                : undefined
                        }
                        newRegister={!props.data}
                        error={logics.errors[key] as FieldError}
                        field={props.scheme.fields[key]}
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
