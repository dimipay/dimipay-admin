import { createJWT } from "@/functions"
import { prisma } from "@/storage"
import { HandlerError } from "@/types"
import { endpoint } from "."

const actions = {
    POST: async (content: { username: string; password: string }) => {
        const user = await prisma.user.findFirst({
            where: {
                accountName: content.username,
            },
        })

        if (!user)
            throw new HandlerError("일치하는 사용자를 찾을 수 없어요", 400)

        return {
            token: createJWT(user),
            user,
        }
    },
}

export default endpoint(actions)
export type loginKone = typeof actions
