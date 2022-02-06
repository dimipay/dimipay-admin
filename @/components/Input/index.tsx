import { numberInputIcon } from "@/assets"
import { Token } from "@/typo"
import { Hexile } from "@haechi/flexile"
import { UseFormRegisterReturn } from "react-hook-form"
import { LoadSVG } from ".."
import { InputWraper, LogicalInput } from "./style"

const TYPE_ICON_MAP = {
    number: numberInputIcon,
}

export const Input: React.FC<{
    placeholder: string
    name: string
    hideContent?: boolean
    hooker?: UseFormRegisterReturn
    defaultValue?: string
    disabled?: boolean
    type?: "number"
    error?: string
}> = (props) => (
    <label>
        <InputWraper
            gap={1.5}
            padding={3}
            disabled={props.disabled}
            hasError={!!props.error}
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
            {props.type === undefined ? (
                <LogicalInput
                    disabled={props.disabled}
                    defaultValue={props.defaultValue}
                    placeholder={props.placeholder}
                    {...props.hooker}
                    {...(props.hideContent && {
                        type: "password",
                    })}
                />
            ) : (
                props.type === "number" && (
                    <LogicalInput
                        disabled={props.disabled}
                        defaultValue={props.defaultValue}
                        placeholder={props.placeholder}
                        onInput={(e) => {
                            e.currentTarget.value =
                                e.currentTarget.value.replace(/[^0-9]/g, "")
                        }}
                        {...props.hooker}
                        {...(props.hideContent && {
                            type: "password",
                        })}
                    />
                )
            )}
            {props.error && <Token color="error">{props.error}</Token>}
        </InputWraper>
    </label>
)
