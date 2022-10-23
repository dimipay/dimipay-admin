import { batchEditWizardFileAtom } from "@/coil"
import { Button, Table, WizardFrame } from "@/components"
import { NeoField, text } from "@/fields"
import { NeoScheme, SLUG } from "@/types"
import { Description, Important } from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"
import { useAtom } from "jotai"
import Link from "next/link"
import { Sidebar } from "pages/dash/partial"
import { useMemo } from "react"

export const LoadCheck = () => {
    const [batchFile] = useAtom(batchEditWizardFileAtom)

    const scheme: NeoScheme | undefined = useMemo(() => {
        if (!batchFile) return
        const fields = batchFile.header.reduce(
            (prev, value) => ({
                ...prev,
                [value]: text({
                    displayName: value === "id" ? "#" : value,
                }),
            }),
            {} as Record<string, NeoField<string>>,
        )

        return {
            fields,
            name: "LOADED",
            slug: SLUG.product,
        } as NeoScheme
    }, [batchFile])

    return (
        <Hexile fillx filly>
            <Sidebar />
            <Vexile fillx filly x="center" y="center" padding={10}>
                <WizardFrame
                    description="파일이 올바르게 불러와졌는지 확인해주세요. 미리보기는 첫 7개만 표시됩니다"
                    title="한번에 수정 마법사"
                    filly
                    fillx>
                    {batchFile ? (
                        <Vexile gap={2} filly>
                            <Description>
                                총 {batchFile.records.length}건
                            </Description>
                            {scheme && (
                                <Table
                                    records={batchFile.records
                                        .slice(0, 7)
                                        .map(e => ({
                                            ...e,
                                            createdAt: new Date(),
                                            updatedAt: new Date(),
                                        }))}
                                    scheme={scheme}
                                />
                            )}
                        </Vexile>
                    ) : (
                        <span>NULL</span>
                    )}
                    <Link href={"../linkformat"}>
                        <Button block>
                            <Important white>
                                데이터가 잘 불러와졌습니다
                            </Important>
                        </Button>
                    </Link>
                </WizardFrame>
            </Vexile>
        </Hexile>
    )
}

export default LoadCheck
