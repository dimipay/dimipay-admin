import { AdminAccount } from "@prisma/client"
import { atom, RecoilState } from "recoil"
import { recoilPersist } from "recoil-persist"
import { TableRecord } from "./types"

export const LOCALSTORAGE_KEY = "PERSISTENCY"

const { persistAtom } = recoilPersist({
    key: LOCALSTORAGE_KEY,
})

export const userAtom = atom<{
    user: AdminAccount
    token: string
} | null>({
    default: null,
    key: "USER",
    effects_UNSTABLE: [persistAtom],
})

export const subContentAtom = atom<{
    name: string
    element: JSX.Element
} | null>({
    default: null,
    key: "SUB_CONTENT",
})

export const selectedRowAtom = atom<TableRecord | null>({
    default: null,
    key: "SELECTED_ROW",
})

export const getAtom = <AtomType>(atom: RecoilState<AtomType>): AtomType => {
    const persistSerialized = localStorage.getItem(LOCALSTORAGE_KEY)
    if (!persistSerialized) throw new Error("로그인이 필요해요")

    const persist = JSON.parse(persistSerialized)
    return persist[atom.key]
}
