import { logNotion, verifyJWT } from "@/functions"
import { HandlerError } from "@/types"
import { NextApiHandler } from "next"

export type Handlers = Record<string, (props: any, slug: any) => unknown>

export const endpoint =
    (handlers: Handlers): NextApiHandler =>
    async (req, res) => {
        const user =
            req.headers.authorization &&
            verifyJWT<{
                number: string
                username: string
            }>(req.headers.authorization)

        const reqContent =
            req.method === "GET" && req.query.query
                ? JSON.parse(req.query.query as string)
                : req.body

        try {
            if (!(req.url === "/api/login" || user)) {
                throw new HandlerError("로그인이 필요해요", 401)
            }

            const handler = handlers[req.method as string]
            if (!handler) throw new HandlerError(`동작을 찾을 수 없어요`, 404)

            const result = await handler(reqContent, req.query)

            logNotion({
                actioner: (user && user.username) || "anonymous",
                type: req.method!,
                url: req.url!,
                data: req.url === "/api/login" ? "BLIND" : reqContent,
                result: result,
            })

            res.json(result)
        } catch (e) {
            if (e instanceof HandlerError) {
                res.status(e.code).json({
                    message: e.message,
                    isHandlerError: true,
                })
            } else {
                console.log("오류 발생!", e)
                const code = (e as { code: number }).code
                const isCodeNumeric = !isNaN(code)
                res.status((isCodeNumeric && +code) || 500).json({
                    message: "알 수 없는 오류가 발생했어요",
                    isHandlerError: true,
                })
            }

            logNotion({
                actioner: (user && user.username) || "anonymous",
                type: req.method!,
                url: req.url!,
                data: req.url === "/api/login" ? "BLIND" : reqContent,
                result: e,
            })
        }
    }

export default ((_, res) => {
    res.json({
        message: "Server is running correctly",
    })
}) as NextApiHandler
