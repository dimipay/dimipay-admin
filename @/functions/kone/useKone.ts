import { useState, useEffect } from "react"

export const useKone = <Input, Output>(
    koneFunction: ((data: Input) => Promise<Output>) | undefined,
    input: Input
): undefined | Output => {
    const [result, setResult] = useState<Output>()
    const serialized = JSON.stringify(input)

    useEffect(() => {
        ;(async () => {
            const res = await koneFunction?.(input)
            setResult(res)
        })()
    }, [koneFunction, serialized])

    return result
}
