import { dimipay_users } from "@prisma/client"
import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()

export const userAtom = atom<{
    user: dimipay_users
    token: string
}>({
    default: null,
    key: "USER",
    effects_UNSTABLE: [persistAtom],
})

export const subContentAtom = atom<{
    name: string
    element: JSX.Element
}>({
    default: null,
    key: "SUB_CONTENT",
    // effects_UNSTABLE: [persistAtom],
})
