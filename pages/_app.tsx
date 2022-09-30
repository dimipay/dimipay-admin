import { ToastContainer } from "react-toastify"
import { useRouter } from "next/router"
import { Provider, unstable_createStore, useAtom } from "jotai"

import { globalCss } from "@/stitches.config"
import { userAtom } from "@/coil"

import "react-toastify/dist/ReactToastify.css"
import "@/assets/font/SUIT-Variable.css"
import "josa-complete"
import { useModal } from "@/components"

globalCss({
    ":root": {
        fontSize: "4px",
        wordBreak: "keep-all",
    },
    body: {
        fontSize: "6rem",
        margin: "0px",
        overflow: "hidden",
        backgroundColor: "$dark6",
        height: "100vh",
    },
    ul: {
        paddingleft: "4rem",
    },
    "#__next": {
        height: "100%",
    },
    "*": {
        fontFamily: "SUIT Variable",
    },
})()

const LoginChecker = ({ children }: { children?: JSX.Element }) => {
    const router = useRouter()
    const [user] = useAtom(userAtom)
    const { element } = useModal()

    if (!router.asPath.startsWith("/login") && !user) {
        if (global.location) router.push("/login")
        return <></>
    }

    return (
        <>
            {element}
            {children}
        </>
    )
}

export const atomStore = unstable_createStore()

const MyApp: React.FC<{
    Component: React.ComponentType
    pageProps: any
}> = props => {
    return (
        <Provider unstable_createStore={() => atomStore}>
            <ToastContainer />
            <LoginChecker>
                <props.Component {...props.pageProps} />
            </LoginChecker>
        </Provider>
    )
}

export default MyApp
