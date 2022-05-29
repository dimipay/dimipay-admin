import { numberInputIcon } from "@/assets"
import { Token } from "@/typo"
import { Hexile } from "@haechi/flexile"
import { UseFormRegisterReturn } from "react-hook-form"
import { LoadSVG } from ".."
import { InputWraper, LogicalInput } from "./style"

const TYPE_ICON_MAP = {
    number: numberInputIcon,
}

export const TEXT_INPUT_COMPATIBLE_TYPES = [
    "string",
    "number",
    "date",
    "password",
] as const

export const Input: React.FC<{
    placeholder: string
    name: string
    error?: string
    value?: string
    disabled?: boolean
    hideContent?: boolean
    defaultValue?: string
    hooker?: UseFormRegisterReturn
    type?: typeof TEXT_INPUT_COMPATIBLE_TYPES[number]
}> = (props) => {
    const commonProps = {
        disabled: props.disabled,
        defaultValue: props.defaultValue,
        placeholder: props.placeholder,
        value: props.value,
        ...props.hooker,
        ...(props.hideContent && {
            type: "password",
        }),
    }
    return (
        <label>
            <InputWraper
                gap={1.5}
                padding={3}
                disabled={props.disabled}
                hasError={typeof props.error === "string"}
            >
                <Hexile gap={1} y="center">
                    {TYPE_ICON_MAP[props.type] && (
                        <LoadSVG
                            src={TYPE_ICON_MAP[props.type]}
                            width={5}
                            height={5}
                            alt="입력창 아이콘"
                        />
                    )}
                    <Token>{props.name}</Token>
                </Hexile>
                {
                    {
                        ["string"]: <LogicalInput {...commonProps} />,
                        ["number"]: (
                            <LogicalInput
                                {...commonProps}
                                onInput={(e) => {
                                    e.currentTarget.value =
                                        e.currentTarget.value.replace(
                                            /[^0-9]/g,
                                            ""
                                        )
                                }}
                            />
                        ),
                        ["date"]: (
                            <LogicalInput
                                {...commonProps}
                                type="datetime-local"
                            />
                        ),
                        ["password"]: (
                            <LogicalInput {...commonProps} type="password" />
                        ),
                    }[props.type || "string"]
                }
                {props.error && <Token color="error">{props.error}</Token>}
            </InputWraper>
        </label>
    )
}
