import { batchEditWizardFileAtom } from "@/coil"
import { WizardFrame } from "@/components"
import { UploadFile } from "@/components/UploadFile"
import { Hexile, Vexile } from "@haechi/flexile"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { Sidebar } from "pages/dash/partial"
import readXlsxFile from "read-excel-file"

export const FileUpload = () => {
    const [, setBatchFile] = useAtom(batchEditWizardFileAtom)
    const router = useRouter()

    return (
        <Hexile fillx filly>
            <Sidebar />
            <Vexile fillx filly x="center" y="center" padding={10}>
                <WizardFrame
                    description="파일을 업로드 해주세요. 한셀로 생성한 파일은 제대로 읽지 못할 수 있어요. xlsx, csv 파일을 지원합니다."
                    title="한번에 수정 마법사"
                    filly>
                    <UploadFile
                        onLoaded={async loaded => {
                            const [header, ...records] = await readXlsxFile(
                                loaded,
                            )

                            const parsed: (Record<
                                string,
                                string | number | Date | boolean
                            > & {
                                id: number
                            })[] = records.map((e, index) =>
                                e.reduce(
                                    (prev, value, fieldIndex) => ({
                                        ...prev,
                                        [header[fieldIndex].toString()]: value,
                                    }),
                                    {
                                        id: index + 1,
                                    },
                                ),
                            )

                            setBatchFile({
                                records: parsed,
                                header: header.map(e => e.toString()),
                            })
                            router.push("../loadcheck")
                        }}
                    />
                </WizardFrame>
            </Vexile>
        </Hexile>
    )
}

export default FileUpload
