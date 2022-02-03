import { HandlerError } from "@/types"
import { toast } from "react-toastify"

export const kone =
    <koneFunc extends (...args: any) => any>(
        endpoint: string,
        method: "POST" | "GET"
    ) =>
    async (data: Parameters<koneFunc>[0]) => {
        try {
            const url =
                `/api/${endpoint}` +
                (method === "GET"
                    ? "?" + new URLSearchParams({ query: JSON.stringify(data) })
                    : "")
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: method === "GET" ? undefined : JSON.stringify(data),
            })

            const fetched = await res.json()

            if (["4", "5"].includes(res.status.toString()[0])) throw fetched

            return fetched
        } catch (e) {
            if (HandlerError.isHandlerError(e)) {
                toast(e.message, {
                    type: "error",
                })

                throw new Error(e.message)
            } else {
                throw e
            }
        }
    }
