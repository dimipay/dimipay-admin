import { closeIcon } from "@/assets"
import { PageHeader, Regular } from "@/typo"
import { Vexile, Hexile } from "@haechi/flexile"
import { LoadSVG } from "../LoadSVG"
import { Wrapper } from "./style"

export const WizardFrame: React.FC<{
    title: string
    description: string
    fillx?: boolean
    filly?: boolean
    gap?: number
}> = props => {
    return (
        <Wrapper
            padding={6}
            gap={props.gap ?? 6}
            fillx={props.fillx}
            filly={props.filly}
            noMaxWidth={props.fillx}>
            <Vexile gap={2}>
                <Hexile x="space" y="center">
                    <PageHeader>{props.title}</PageHeader>
                    <LoadSVG
                        alt="마법사 닫기 버튼"
                        height={3}
                        width={3}
                        src={closeIcon}
                        onClick={() => {
                            return
                        }}
                    />
                </Hexile>
                <Regular>{props.description}</Regular>
            </Vexile>
            {props.children}
        </Wrapper>
    )
}
