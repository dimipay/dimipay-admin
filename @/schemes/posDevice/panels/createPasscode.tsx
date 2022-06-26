import { Important, PageHeader } from "@/typo"
import { Button, Input } from "@/components"
import { Vexile } from "@haechi/flexile"
import { useEffect, useState } from "react"
import { createPasscode, useTimer } from "@/functions"
import { PanelComponent } from "@/types"
import { toast } from "react-toastify"
import { PosDevice } from "@prisma/client"

export const CreatePasscode: PanelComponent = ({ record }) => {
    const [passcode, setPasscode] = useState<string>()
    const timer = useTimer(100, !!passcode)

    const loadPasscode = async () => {
        const loadedPasscode = await createPasscode({
            posId: (record as PosDevice).systemId,
        })

        timer.reset()

        toast.success(`생성된 OTP를 결제 단말기에 입력해주세요`)

        setPasscode(loadedPasscode.passcode)
    }

    useEffect(() => {
        setPasscode(undefined)
    }, [timer.isEnded])

    return (
        <Vexile gap={4}>
            <PageHeader>단말기 등록</PageHeader>
            {passcode && (
                <Vexile gap={2}>
                    <Input
                        disabled
                        label="인증번호"
                        placeholder=""
                        value={passcode}
                    />
                    {timer.element}
                </Vexile>
            )}
            <Button block onClick={loadPasscode}>
                <Important white>인증번호 생성</Important>
            </Button>
        </Vexile>
    )
}

export const SHIT2143 = "FUCK!"
