import { dimipay_users } from "@prisma/client"
import { atom } from "recoil"

export const userAtom = atom<dimipay_users>({
    default: null,
    key: "USER",
})
