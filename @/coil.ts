import { dimipay_users } from "@prisma/client"
import { atom } from "recoil"

export const userAtom = atom<{
    user: dimipay_users
    token: string
}>({
    default: null,
    key: "USER",
})
