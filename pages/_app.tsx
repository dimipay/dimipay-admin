import { globalCss } from "@/stitches.config"
import { ToastContainer, toast } from "react-toastify"
import { RecoilRoot, useRecoilState } from "recoil"
import "josa-complete"

import "react-toastify/dist/ReactToastify.css"
import "@/assets/font/SUIT-Variable.css"
import { useRouter } from "next/router"
import { userAtom } from "@/coil"

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

function MyApp({ Component, pageProps }) {
    return (
        <RecoilRoot>
            <ToastContainer />
            <LoginChecker>
                <Component {...pageProps} />
            </LoginChecker>
        </RecoilRoot>
    )
}

export default MyApp
