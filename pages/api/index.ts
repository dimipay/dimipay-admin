import { HandlerError } from "@/types"
import { NextApiHandler } from "next"

export type Handlers = Record<string, (req: unknown) => unknown>

export const endpoint =
    (handlers: Handlers): NextApiHandler =>
    async (req, res) => {
        try {
            const handler = handlers[req.method]
            const result = await handler(req.body)
            res.json(result)
        } catch (e) {
            console.log(e)

            if (e instanceof HandlerError) {
                res.status(e.code).json({
                    message: e.message,
                    isHandlerError: true,
                })
            } else
                res.status(e.code).json({
                    message: "알 수 없는 오류가 발생했어요",
                    isHandlerError: true,
                })
        }
    }

export default ((_, res) => {
    res.json({
        message: "Server is running correctly",
    })
}) as NextApiHandler
