import { modalContentAtom } from "@/coil"
import { Important, PageHeader, Regular } from "@/typo"
import { Hexile } from "@haechi/flexile"
import { useRecoilState } from "recoil"
import { Button } from ".."
import { ModalBackdrop, ModalWrapper } from "./style"

export interface ModalContent {
    content: string
    title: string
    button: {
        label: string
        color?: "black"
        action(): void
    }[]
}

export const useModal = () => {
    const [content, setContent] = useRecoilState(modalContentAtom)

    const element = content ? (
        <ModalBackdrop
            fillx
            filly
            x="center"
            y="center"
            onClick={() => setContent(null)}>
            <ModalWrapper
                fillx
                gap={2}
                padding={6}
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                }}>
                <PageHeader>{content.title}</PageHeader>
                <Regular>{content.content}</Regular>
                <Hexile x="right">
                    {content.button.map(button => (
                        <Button
                            key={button.label}
                            color={button.color}
                            onClick={button.action}>
                            <Important white>{button.label}</Important>
                        </Button>
                    ))}
                </Hexile>
            </ModalWrapper>
        </ModalBackdrop>
    ) : (
        <>
            <></>
        </>
    )

    return {
        element,
    }
}
