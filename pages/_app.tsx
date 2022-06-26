import { RecoilRoot, useRecoilState } from "recoil"
import { ToastContainer } from "react-toastify"
import { useRouter } from "next/router"

import { globalCss } from "@/stitches.config"
import { userAtom } from "@/coil"

import "react-toastify/dist/ReactToastify.css"
import "@/assets/font/SUIT-Variable.css"
import "josa-complete"

globalCss({
    ":root": {
        fontSize: "4px",
    },
    body: {
        fontSize: "6rem",
        margin: "0px",
        overflow: "hidden",
        backgroundColor: "$dark6",
        height: "100vh",
    },
    "#__next": {
        height: "100%",
    },
    "*": {
        fontFamily: "SUIT Variable",
    },
})()

const LoginChecker: React.FC = (props) => {
    const router = useRouter()
    const [user] = useRecoilState(userAtom)

    if (!router.asPath.startsWith("/login") && !user) {
        if (global.location) router.push("/login")
        return <></>
    }

    return <>{props.children}</>
}

const MyApp: React.FC<{
    Component: React.ComponentType
    pageProps: any
}> = (props) => {
    return (
        <RecoilRoot>
            <ToastContainer />
            <LoginChecker>
                <props.Component {...props.pageProps} />
            </LoginChecker>
        </RecoilRoot>
    )
}

export default MyApp
