import { useEffect } from "react"

const ALLOWED_LOG: string[] = ["TABLE_FETCH", "SLUG"]

export const useConsole = (name: string, data: unknown) => {
    useEffect(() => {
        if (ALLOWED_LOG.includes(name)) console.log(name, data)
    }, [name, data])
}
