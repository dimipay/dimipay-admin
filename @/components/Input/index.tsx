import { HTMLInputTypeAttribute } from "react"
import { InputWraper, LogicalInput } from "./style"
import { numberInputIcon } from "@/assets"
import { FormikHandlers } from "@/types"
import { Hexile } from "@haechi/flexile"
import { Token } from "@/typo"
import { LoadSVG } from ".."

const TYPE_ICON_MAP: Record<string, string> = {
    number: numberInputIcon,
}

export const Input: React.FC<
    {
        placeholder?: string
        label: string
        error?: string
        value?: string | number
        disabled?: boolean
        hideContent?: boolean
        defaultValue?: string
        type?: HTMLInputTypeAttribute
        name?: string
    } & Partial<FormikHandlers>
> = props => {
    const commonProps = {
        disabled: props.disabled,
        defaultValue: props.defaultValue,
        placeholder: props.placeholder,
        value: props.value,
        onChange: props.onChange,
        onBlur: props.onBlur,
        name: props.name,
        type: props.type,
    }

    return (
        <label>
            <InputWraper
                gap={1.5}
                padding={3}
                disabled={props.disabled}
                hasError={typeof props.error === "string"}>
                <Hexile gap={1} y="center">
                    {props.type && TYPE_ICON_MAP[props.type] && (
                        <LoadSVG
                            src={TYPE_ICON_MAP[props.type]}
                            width={5}
                            height={5}
                            alt="입력창 아이콘"
                        />
                    )}
                    <Token>{props.label}</Token>
                </Hexile>
                <LogicalInput {...commonProps} />
                {props.error && <Token color="error">{props.error}</Token>}
            </InputWraper>
        </label>
    )
}
