import { key, loadRedis, prisma } from "@/storage"
import { HandlerError } from "@/types"
import bcrypt from "bcrypt"
import { endpoint } from ".."

const actions = {
    POST: async (content: { posId: string }) => {
        const pos = await prisma.posDevice.findFirst({
            where: {
                id: content.posId,
            },
        })
        if (!pos)
            throw new HandlerError("일치하는 결제 단말기를 찾을 수 없어요", 400)

        const randomKey = Math.floor(Math.random() * 1000)
            .toString()
            .padStart(4, "0")

        try {
            const redis = await loadRedis()

            if (await redis.get(key.posRegistrationCode(pos.id)))
                throw new HandlerError("이미 인증코드가 생성되었어요", 400)

            await redis.set(
                key.posRegistrationCode(pos.id),
                bcrypt.hashSync(randomKey, 10)
            )

            await redis.expire(key.posRegistrationCode(pos.id), 100)

            return {
                otp: randomKey,
            }
        } catch (e) {
            if (e instanceof HandlerError) throw e

            console.log(e)
            throw new HandlerError("서버에 오류가 발생했어요", 500)
        }
    },
}

export default endpoint(actions)
export type otpKone = typeof actions
