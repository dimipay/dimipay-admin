import { Vexile } from "@haechi/flexile"
import { useRecoilValue } from "recoil"
import { useRouter } from "next/router"
import { useEffect } from "react"

import { LoadSVG } from "@/components"
import { userAtom } from "@/coil"
import { logo } from "@/assets"

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
