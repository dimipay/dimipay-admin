import { useEffect, useRef } from "react"

// code from https://github.com/samanmohamadi/use-throttled-effect/blob/master/src/index.js

export const useThrottledEffect = (
    callback: () => void,
    delay: number,
    deps: unknown[] = []
) => {
    const lastRan = useRef(Date.now())

    useEffect(() => {
        const handler = setTimeout(function () {
            if (Date.now() - lastRan.current >= delay) {
                callback()
                lastRan.current = Date.now()
            }
        }, delay - (Date.now() - lastRan.current))

        return () => {
            clearTimeout(handler)
        }
    }, [delay, ...deps])
}

export default useThrottledEffect
