import { globalCss } from "@/stitches.config"
import "@/assets/font/SUIT-Variable.css"
import { RecoilRoot } from "recoil"

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
            <Component {...pageProps} />
        </RecoilRoot>
    )
}

export default MyApp
