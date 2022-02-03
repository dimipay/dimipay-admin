import { HandlerError } from "@/types"
import { toast } from "react-toastify"

export const kone =
    <koneFunc extends (...args: any) => any>(
        endpoint: string,
        method: "POST" | "GET"
    ) =>
    async (data: Parameters<koneFunc>[0]) => {
        try {
            const res = await fetch(`/api/${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
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
            }
        }
    }
