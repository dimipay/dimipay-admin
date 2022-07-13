import { batchEditWizardFileAtom } from "@/coil"
import {
    Accent,
    Button,
    InlineSelect,
    LoadSVG,
    WizardFrame,
} from "@/components"
import { TABLES } from "@/constants"
import { Decorative, Important, Regular } from "@/typo"
import { Hexile, Vexile } from "@haechi/flexile"
import { useRouter } from "next/router"
import { Sidebar } from "pages/dash/partial"
import { useCallback, useMemo, useState } from "react"
import { useRecoilState } from "recoil"
import produce from "immer"
import { FieldItem } from "./style"
import { get을를 } from "josa-complete"
import { anchorIcon } from "@/assets"

const LinkForat = () => {
    const [batchFile, setBatchFile] = useRecoilState(batchEditWizardFileAtom)

    const router = useRouter()

    const [fieldMatches, setFieldMatches] = useState<string[]>([])

    const updateMatchField = useCallback((index: number, value: string) => {
        setFieldMatches(prev =>
            produce(prev, draft => {
                draft[index] = value
            }),
        )
    }, [])

    const scheme = useMemo(() => {
        if (!router.query.slug) return
        const loadedScheme = TABLES.find(e => e.slug === router.query.slug)
        return loadedScheme
    }, [router])

    const alignField = useMemo(() => {
        if (!scheme) return

        if (fieldMatches.includes("id")) return "id"

        const alignField = fieldMatches.find(
            match => scheme.fields[match].field.isUnique,
        )

        return alignField
    }, [scheme, fieldMatches])

    return (
        <Hexile fillx filly>
            <Sidebar />
            <Vexile fillx filly x="center" y="center" padding={10}>
                <WizardFrame
                    description={`
                    업로드한 파일과 기존 자료의 형식을 맞춰주세요.
                    기존 데이터의 이름 옆에 닻 모양이 있는 항목을
                    기준으로 데이터가 수정되니, 닻 모양⚓을 하나 이상
                    선택해주세요.`}
                    title="한번에 수정 마법사"
                    filly>
                    <Vexile gap={4} filly y="center">
                        <Hexile gap={10}>
                            <Vexile fillx>
                                <Important>엑셀 파일</Important>
                            </Vexile>
                            <Vexile fillx>
                                <Important>기존 데이터</Important>
                            </Vexile>
                        </Hexile>
                        <Hexile gap={2} y="center">
                            <Vexile fillx gap={2}>
                                {batchFile?.header.map(fieldName => (
                                    <FieldItem key={fieldName}>
                                        <Regular>{fieldName}</Regular>
                                    </FieldItem>
                                ))}
                            </Vexile>
                            <Decorative accent>→</Decorative>
                            {scheme && (
                                <Vexile fillx gap={2}>
                                    {batchFile?.header.map((_, index) => (
                                        <InlineSelect
                                            key={_}
                                            placeholder="선택하지 않음"
                                            onChange={e =>
                                                updateMatchField(index, e)
                                            }
                                            options={Object.entries(
                                                scheme.fields,
                                            ).map(([key, value]) => ({
                                                key,
                                                label: value.field.displayName,
                                                disabled:
                                                    fieldMatches.includes(
                                                        key,
                                                    ) &&
                                                    fieldMatches[index] !== key,
                                                icon: value.field.isUnique ? (
                                                    <LoadSVG
                                                        alt="닻 모양"
                                                        src={anchorIcon}
                                                        width={4}
                                                        height={4}
                                                    />
                                                ) : undefined,
                                            }))}
                                            selectedKey={fieldMatches[index]}
                                        />
                                    ))}
                                </Vexile>
                            )}
                        </Hexile>
                    </Vexile>
                    {alignField ? (
                        <Vexile gap={4}>
                            <Regular center>
                                <Accent>
                                    {
                                        scheme!.fields[alignField].field
                                            .displayName
                                    }
                                </Accent>
                                {get을를(
                                    scheme!.fields[alignField].field
                                        .displayName,
                                )}{" "}
                                기준으로 자료가 수정됩니다
                            </Regular>
                            <Button
                                block
                                onClick={() => {
                                    if (!batchFile) return

                                    setBatchFile({
                                        ...batchFile,
                                        match: fieldMatches,
                                        alignField,
                                    })
                                    router.push(location.href + "/../preview")
                                }}>
                                <Important white>다음</Important>
                            </Button>
                        </Vexile>
                    ) : (
                        <Vexile gap={4}>
                            <Regular center>
                                닻 모양 데이터를 하나 이상 선택해주세요
                            </Regular>
                            <Button disabled block>
                                <Important white>다음</Important>
                            </Button>
                        </Vexile>
                    )}
                </WizardFrame>
            </Vexile>
        </Hexile>
    )
}

export default LinkForat
