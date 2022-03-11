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

        const randomKey = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")

        try {
            const redis = await loadRedis()
            const regPasscodeHash = await redis.get(key.posRegistrationPasscode)

            if (regPasscodeHash) {
                throw new HandlerError(
                    "등록중인 포스가 있어요, 잠깐만 기다려주세요",
                    400
                )
            }

            await redis.set(
                key.posRegistrationPasscode,
                `${content.posId}:${randomKey}`
            )

            await redis.expire(key.posRegistrationPasscode, 100)

            return {
                passcode: randomKey,
            }
        } catch (e) {
            if (e instanceof HandlerError) throw e
            throw new HandlerError("서버에 오류가 발생했어요", 500, e)
        }
    },
}

export default endpoint(actions)
export type passcodeKone = typeof actions
