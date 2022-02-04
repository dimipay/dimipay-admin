import { useEffect } from "react"

const ALLOWED_LOG: string[] = ["SELECTIVE"]

export const useConsole = (name: string, data: unknown) => {
    useEffect(() => {
        if (ALLOWED_LOG.includes(name)) console.log(name, data)
    }, [name, data])
}
