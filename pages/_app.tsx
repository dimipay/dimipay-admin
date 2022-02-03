import { globalCss } from "@/stitches.config"
import "@/assets/font/SUIT-Variable.css"

globalCss({
  ':root': {
    fontSize: '6px',
  },
  body: {
    fontSize: '4rem',
    fontFamily: 'Pretendard',
    margin: '0px',
    overflow: 'hidden',
  },
  button: {
    fontFamily: 'Pretendard',
  },
})()

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
