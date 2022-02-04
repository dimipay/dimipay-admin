import { useState, useEffect, useCallback } from "react"

export const useKone = <Input, Output>(
    koneFunction: ((data: Input) => Promise<Output>) | undefined,
    input: Input
): undefined | [Output, () => void] => {
    const [result, setResult] = useState<Output>()
    const serialized = JSON.stringify(input)

    const load = useCallback(() => {
        ;(async () => {
            const res = await koneFunction?.(input)
            setResult(res)
        })()
    }, [koneFunction, serialized])

    useEffect(() => {
        load()
    }, [koneFunction, serialized])

    return [result, load]
}
