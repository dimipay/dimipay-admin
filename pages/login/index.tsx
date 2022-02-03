import useForm from "react-hook-form"
import { logo } from "@/assets"
import { Button, Input, LoadSVG } from "@/components"
import { Vexile } from "@haechi/flexile"
import { LoginWrapper } from "./style"
import { Description, Important } from "@/typo"

export const Login = () => {
    return (
        <Vexile fillx filly x="center" y="center">
            <LoginWrapper padding={10} gap={6} x="center">
                <LoadSVG
                    alt="디미페이 관리자 페이지 로고"
                    height={5}
                    width={40}
                    src={logo}
                />
                <Vexile gap={4}>
                    <Input placeholder="아이디를 입력해주세요" name="아이디" />
                    <Input
                        placeholder="비밀번호를 입력해주세요"
                        name="비밀번호"
                        hideContent
                    />
                </Vexile>
                <Description>계정 문의 : reactdev@kakao.com</Description>
                <Button big>
                    <Important white>로그인</Important>
                </Button>
            </LoginWrapper>
        </Vexile>
    )
}

export default Login
