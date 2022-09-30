import { useAtom } from "jotai"
import { modalContentAtom } from "@/coil"
import { Important, PageHeader, Regular } from "@/typo"
import { Hexile } from "@haechi/flexile"
import { Button } from ".."
import { ModalBackdrop, ModalWrapper } from "./style"

export interface ModalContent {
    content: JSX.Element | string
    title: string
    wide?: boolean
    button?: {
        label: string
        color?: "black"
        action(): void
    }[]
}

export const useModal = () => {
    const [content, setContent] = useAtom(modalContentAtom)

    const element = content ? (
        <ModalBackdrop
            fillx
            filly
            x="center"
            y="center"
            onClick={() => setContent(null)}>
            <ModalWrapper
                fillx
                gap={4}
                padding={6}
                isWide={content.wide}
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                }}>
                <PageHeader>{content.title}</PageHeader>
                {typeof content.content === "string" ? (
                    <Regular>{content.content}</Regular>
                ) : (
                    content.content
                )}
                {content.button && (
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
                )}
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
