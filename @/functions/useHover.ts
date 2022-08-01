import { useState } from "react"

export const useHover = () => {
    const [isHovered, setHover] = useState(false)
    const onMouseEnter = () => setHover(true)
    const onMouseLeave = () => setHover(false)

    return {
        events: {
            onMouseEnter,
            onMouseLeave,
        },
        hover: isHovered,
    }
}
