import { logo } from "@/assets"
import { userAtom } from "@/coil"
import { LoadSVG } from "@/components"
import { Vexile } from "@haechi/flexile"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"

export default function AuthBranching() {
    const user = useRecoilValue(userAtom)
    const goto = useRouter()

    useEffect(() => {
        if (user) goto.replace("/dash")
        else goto.replace("/login")
    }, [user, goto])

    return (
        <Vexile fillx filly x="center" y="center">
            <LoadSVG
                alt="디미페이 관리자 페이지 로고. 로딩중."
                height={5}
                width={40}
                src={logo}
            />
        </Vexile>
    )
}
