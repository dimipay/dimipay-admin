import { storeInWizardFileAtom } from "@/coil"
import { WizardFrame } from "@/components"
import { UploadFile } from "@/components/UploadFile"
import { Hexile, Vexile } from "@haechi/flexile"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { Sidebar } from "pages/dash/partial"
import readXlsxFile from "read-excel-file"

export const FileUpload = () => {
    const [, setStoreFile] = useAtom(storeInWizardFileAtom)
    const router = useRouter()

    return (
        <Hexile fillx filly>
            <Sidebar />
            <Vexile fillx filly x="center" y="center" padding={10}>
                <WizardFrame
                    title="상품 한번에 입고하기 마법사"
                    description="거래처에서 넘겨받은 파일을 업로드 해주세요"
                    filly>
                    <UploadFile
                        onLoaded={async loaded => {
                            const records = await readXlsxFile(loaded)

                            setStoreFile(
                                records
                                    .map(record => ({
                                        name: record[1]?.toString(),
                                        barcode: record[12]?.toString(),
                                        amount: +record[3]?.toString(),
                                        unitCost: +record[4]?.toString(),
                                    }))
                                    .filter(
                                        e => e.name && e.amount && e.barcode,
                                    ),
                            )

                            router.push(location.href + "/../check")
                        }}
                    />
                </WizardFrame>
            </Vexile>
        </Hexile>
    )
}

export default FileUpload
