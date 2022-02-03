import { globalCss } from "@/stitches.config"
import { ToastContainer, toast } from "react-toastify"
import { RecoilRoot } from "recoil"

import "react-toastify/dist/ReactToastify.css"
import "@/assets/font/SUIT-Variable.css"

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

function MyApp({ Component, pageProps }) {
    return (
        <RecoilRoot>
            <ToastContainer />
            <Component {...pageProps} />
        </RecoilRoot>
    )
}

export default MyApp
