import { useState, useEffect } from "react"

export const useKone = <Input, Output>(
    koneFunction: ((data?: Input) => Promise<Output>) | undefined,
    input?: Input
): [Output | undefined, () => void] => {
    const [result, setResult] = useState<Output>()
    const serialized = JSON.stringify(input)

    const load = async () => {
        const res = await koneFunction?.(input)
        setResult(res)
    }

    useEffect(() => {
        load()
    }, [koneFunction, serialized])

    return [result, load]
}
