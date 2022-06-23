import { getAtom, LOCALSTORAGE_KEY, userAtom } from "@/coil"
import { HandlerError } from "@/types"
import { toast } from "react-toastify"

const getAuthHeader = () => {
    const token = getAtom(userAtom)?.token

    if (token)
        return {
            Authorization: token,
        }

    return
}

export const kone =
    <koneFunc extends (...args: any) => any>(
        endpoint: string,
        method: "POST" | "GET" | "PATCH" | "DELETE"
    ) =>
        async (
            data?: Parameters<koneFunc>[0]
        ): Promise<Awaited<ReturnType<koneFunc>>> => {
            try {

                const url =
                    `/api/${endpoint}` +
                    (method === "GET" && data
                        ? "?" + new URLSearchParams({ query: JSON.stringify(data) })
                        : "")
                const res = await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        ...(endpoint !== "login" && getAuthHeader()),
                    },
                    body: method === "GET" ? undefined : JSON.stringify(data),
                })

                if (
                    res.status === 401
                ) {
                    window.location.href = "/login"
                }

                const fetched = await res.json()

                if (["4", "5"].includes(res.status.toString()[0])) throw fetched

                return fetched
            } catch (e) {
                if (HandlerError.isHandlerError(e)) {
                    toast.info(e.message)

                    throw new Error(e.message)
                } else {
                    throw e
                }
            }
        }
