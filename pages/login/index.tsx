import { SubmitHandler, useForm } from "react-hook-form"
import { LoginWrapper } from "./style"

import { Button, InlineForm, Input, LoadSVG } from "@/components"
import { Description, Important } from "@/typo"
import { AuthIdentification, HandlerError } from "@/types"
import { Vexile } from "@haechi/flexile"
import { logo } from "@/assets"
import { login } from "@/functions"
import { useRecoilState } from "recoil"
import { userAtom } from "@/coil"
import { useRouter } from "next/router"

export const Login = () => {
    const { register, handleSubmit } = useForm<AuthIdentification>()
    const setUser = useRecoilState(userAtom)[1]
    const router = useRouter()

    const onSubmit: SubmitHandler<AuthIdentification> = async (data) => {
        try {
            const res = await login(data)
            setUser(res)
            router.replace("/dash")
        } catch (e) {
            if (e instanceof HandlerError) {
                alert(e.message)
            }
        }
    }

    return (
        <InlineForm onSubmit={handleSubmit(onSubmit)}>
            <Vexile fillx filly x="center" y="center">
                <LoginWrapper padding={10} gap={6} x="center">
                    <LoadSVG
                        alt="디미페이 관리자 페이지 로고"
                        height={5}
                        width={40}
                        src={logo}
                    />
                    <Vexile gap={4}>
                        <Input
                            hooker={register("username")}
                            placeholder="아이디를 입력해주세요"
                            name="아이디"
                        />
                        <Input
                            hooker={register("password")}
                            placeholder="비밀번호를 입력해주세요"
                            name="비밀번호"
                            hideContent
                        />
                    </Vexile>
                    <Description>계정 문의 : reactdev@kakao.com</Description>
                    <Button big block>
                        <Important white>로그인</Important>
                    </Button>
                </LoginWrapper>
            </Vexile>
        </InlineForm>
    )
}

export default Login
