import { Important, PageHeader } from "@/typo"
import { Button, Input } from "@/components"
import { Vexile } from "@haechi/flexile"
import { useState } from "react"
import { createPasscode, useTimer } from "@/functions"
import { PanelComponent } from "@/types"
import { toast } from "react-toastify"

export const CreatePasscode: PanelComponent = ({ record }) => {
    const [passcode, setPasscode] = useState<string>()
    const timer = useTimer(100, !!passcode)

    const loadPasscode = async () => {
        const loadedPasscode = await createPasscode({
            posId: record.id,
        })

        toast.success(`생성된 OTP를 결제 단말기에 입력해주세요`)

        setPasscode(loadedPasscode.passcode)
    }

    return (
        <Vexile gap={4}>
            <PageHeader>단말기 등록</PageHeader>
            {passcode && (
                <Vexile gap={2}>
                    <Input
                        disabled
                        name="인증번호"
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
