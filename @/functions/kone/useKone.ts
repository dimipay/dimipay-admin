import { useState, useEffect, useCallback } from "react"
import { useThrottledEffect } from ".."

export const useKone = <Input, Output>(
    koneFunction: ((data: Input) => Promise<Output>) | undefined,
    input: Input
): undefined | [Output, () => void] => {
    const [result, setResult] = useState<Output>()
    const serialized = JSON.stringify(input)

    const load = async () => {
        const res = await koneFunction?.(input)
        setResult(res)
    }

    useThrottledEffect(
        () => {
            load()
        },
        1000,
        [koneFunction, serialized]
    )

    return [result, load]
}
