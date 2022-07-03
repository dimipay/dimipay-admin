import { fileIcon } from "@/assets"
import { batchEditWizardFileAtom } from "@/coil"
import { Description } from "@/typo"
import { useRouter } from "next/router"
import { ChangeEventHandler, useState } from "react"
import readXlsxFile from "read-excel-file"
import { useSetRecoilState } from "recoil"
import { LoadSVG } from "../LoadSVG"
import { LogicalInput, UploadField } from "./style"

export const UploadFile: React.FC<{
    onLoaded?(file: File): void
}> = (props) => {
    const [isHover, setIsHover] = useState(false)

    const dragHover = () => {
        setIsHover(true)
    }

    const dragEnd = () => {
        setIsHover(false)
    }

    const onChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const loaded = e.target.files?.[0]
        if (!loaded) return

        props.onLoaded?.(loaded)
    }

    return (
        <UploadField
            fillx
            filly
            x="center"
            y="center"
            gap={4}
            isFileHovered={isHover}
            onDragOver={dragHover}
            onDragEnter={dragHover}
            onDragLeave={dragEnd}
            onDragEnd={dragEnd}
            onDrop={dragEnd}
        >
            <LoadSVG
                alt="파일 업로드 아이콘"
                height={8}
                width={8}
                src={fileIcon}
            />
            <Description>
                여기를 클릭하거나 파일을 여기로 드래그해서 불러와주세요
            </Description>
            <LogicalInput type="file" onChange={onChange} />
        </UploadField>
    )
}
