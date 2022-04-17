import { createJWT } from "@/functions"
import { prisma } from "@/storage"
import { HandlerError } from "@/types"
import bcrypt from "bcrypt"
import { endpoint } from "."

const actions = {
    POST: async (content: { username: string; password: string }) => {
        const user = await prisma.adminAccount.findFirst({
            where: {
                username: content.username,
            },
        })

        console.log(bcrypt.hashSync(content.password, 10))

        if (!user || !bcrypt.compareSync(content.password, user.hashedPassword))
            throw new HandlerError("일치하는 사용자를 찾을 수 없어요", 400)

        return {
            token: createJWT({
                id: user.id,
            }),
            user,
        }
    },
}

export default endpoint(actions)
export type loginKone = typeof actions
