import { storeInWizardFileAtom } from "@/coil"
import { WizardFrame } from "@/components"
import { UploadFile } from "@/components/UploadFile"
import { Hexile, Vexile } from "@haechi/flexile"
import { useRouter } from "next/router"
import { Sidebar } from "pages/dash/partial"
import readXlsxFile from "read-excel-file"
import { useSetRecoilState } from "recoil"

export const FileUpload = () => {
    const setStoreFile = useSetRecoilState(storeInWizardFileAtom)
    const router = useRouter()

    return (
        <Hexile fillx filly>
            <Sidebar />
            <Vexile fillx filly x="center" y="center" padding={10}>
                <WizardFrame
                    title="입고 물품들을 스캔해주세요"
                    description="모든 물건을 하나 하나 스캔해주세요"
                    filly>
                    <UploadFile
                        onLoaded={async loaded => {
                            const records = await readXlsxFile(loaded)

                            setStoreFile(
                                records
                                    .map(record => ({
                                        name: record[1].toString(),
                                        barcode: record[12].toString(),
                                        amount: +record[3].toString(),
                                    }))
                                    .filter(e => e.barcode),
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
