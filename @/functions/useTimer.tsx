import { useEffect, useState } from "react"
import { styled } from "@/stitches.config"
import { Vexile } from "@haechi/flexile"
import { Description } from "@/typo"

export const TimeLeftIndicator = styled("div", {
    height: "1rem",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    borderRadius: "1rem",
    overflow: "hidden",
    "&:after": {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        content: "",
        display: "block",
        height: "1rem",
        width: "0%",
        transition: "1s linear",
    },
})

export const useTimer = (time: number, started: boolean = true) => {
    const [lastTime, setLastTime] = useState(time)

    useEffect(() => {
        if (!started) return

        const decreaseInterval = setInterval(
            () => setLastTime((prev) => prev - 1),
            1000
        )

        return () => {
            clearInterval(decreaseInterval)
        }
    }, [started])

    return {
        element: (
            <Vexile fillx x="center" gap={2}>
                <TimeLeftIndicator
                    css={{
                        "&:after": {
                            width: (20 - lastTime) * 5 + "%",
                        },
                    }}
                />
                <Description>{lastTime}초</Description>
            </Vexile>
        ),
        lastTime,
        isEnded: lastTime < 1,
    }
}
