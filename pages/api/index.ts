import { HandlerError } from "@/types"
import { NextApiHandler } from "next"

export type Handlers = Record<
    string,
    (req: unknown, slug?: Record<string, string | string[]>) => unknown
>

export const endpoint =
    (handlers: Handlers): NextApiHandler =>
    async (req, res) => {
        try {
            const handler = handlers[req.method]
            if (!handler) throw new HandlerError(`동작을 찾을 수 없어요`, 404)
            const result = await handler(
                req.method === "GET"
                    ? JSON.parse(req.query.query as string)
                    : req.body,
                req.query
            )
            res.json(result)
        } catch (e) {
            if (e instanceof HandlerError) {
                res.status(e.code).json({
                    message: e.message,
                    isHandlerError: true,
                })
            } else {
                console.log("오류 발생!", e)
                res.status(e.code || 500).json({
                    message: "알 수 없는 오류가 발생했어요",
                    isHandlerError: true,
                })
            }
        }
    }

export default ((_, res) => {
    res.json({
        message: "Server is running correctly",
    })
}) as NextApiHandler
