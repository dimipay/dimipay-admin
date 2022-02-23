import { Description, Important, PageHeader } from "@/typo"
import { Button, Input } from "@/components"
import { useForm } from "react-hook-form"
import { Vexile } from "@haechi/flexile"
import { useState } from "react"
import { createOtp, useTimer } from "@/functions"
import { PanelComponent } from "@/types"
import { toast } from "react-toastify"

export const CreateOtp: PanelComponent = ({ record }) => {
    const [otp, setOtp] = useState<string>()
    const timer = useTimer(100, !!otp)

    const loadOtp = async () => {
        const loadedOtp = await createOtp({
            posId: record.id,
        })

        toast.success(`생성된 OTP를 결제 단말기에 입력해주세요`)

        setOtp(loadedOtp.otp)
    }

    return (
        <Vexile gap={4}>
            <PageHeader>단말기 등록</PageHeader>
            {otp && (
                <Vexile gap={2}>
                    <Input
                        disabled
                        name="인증번호"
                        placeholder=""
                        value={otp}
                    />
                    {timer.element}
                </Vexile>
            )}
            <Button block onClick={loadOtp}>
                <Important white>인증번호 생성</Important>
            </Button>
        </Vexile>
    )
}

export const SHIT2143 = "FUCK!"
