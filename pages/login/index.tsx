import { Vexile } from "@haechi/flexile"
import { useRecoilState } from "recoil"
import { useRouter } from "next/router"
import { useFormik } from "formik"

import { Button, InlineForm, Input, LoadSVG } from "@/components"
import { AuthIdentification, HandlerError } from "@/types"
import { Description, Important } from "@/typo"
import { login } from "@/functions"
import { UserAtom, userAtom } from "@/coil"
import { logo } from "@/assets"

import { LoginWrapper } from "./style"

export const Login = () => {
    const setUser = useRecoilState(userAtom)[1]
    const router = useRouter()

    const { handleSubmit, handleBlur, handleChange, errors } =
        useFormik<AuthIdentification>({
            initialValues: {
                username: "",
                password: "",
            },
            async onSubmit(data) {
                try {
                    const res = await login(data)
                    setUser(res as UserAtom)
                    router.replace("/dash")
                } catch (e) {
                    if (e instanceof HandlerError) {
                        alert(e.message)
                    }
                }
            },
        })

    return (
        <InlineForm onSubmit={handleSubmit}>
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
                            placeholder="아이디를 입력해주세요"
                            label="아이디"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.username}
                        />
                        <Input
                            placeholder="비밀번호를 입력해주세요"
                            label="비밀번호"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.password}
                            hideContent
                        />
                    </Vexile>
                    <Description>계정 문의 : reactdev@kakao.com</Description>
                    <Button big block type="submit">
                        <Important white>로그인</Important>
                    </Button>
                </LoginWrapper>
            </Vexile>
        </InlineForm>
    )
}

export default Login
