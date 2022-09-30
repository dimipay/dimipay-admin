import { AdminAccount } from "@prisma/client"
import { atom } from "jotai"
import { ModalContent } from "./components/Modal"
import { PermissionType } from "./schemes"
import { Store, TableRecord } from "./types"

// export const LOCALSTORAGE_KEY = "PERSISTENCY"

export interface UserAtom {
    user: AdminAccount & {
        AdminRole: {
            permissions: PermissionType | null
        } | null
    }
    token: string
}

export const userAtom = atom<UserAtom | null>(null)

export const experimentalFlagsAtom = atom<string[]>([])

export const subContentAtom = atom<{
    name: string
    element: JSX.Element
} | null>(null)

export const selectedRowAtom = atom<TableRecord | null>(null)

export const batchEditWizardFileAtom = atom<{
    records: (Record<string, string | number | Date | boolean> & {
        id: number
    })[]
    header: string[]
    match?: string[]
    alignField?: string
} | null>(null)

export const storeInWizardFileAtom = atom<Store[] | null>(null)

export const modalContentAtom = atom<null | ModalContent>(null)

// export const getAtom = <AtomType>(atom: PrimitiveAtom<AtomType>): AtomType => {
//     const persistSerialized = localStorage.getItem(LOCALSTORAGE_KEY)
//     if (!persistSerialized) throw new Error("로그인이 필요해요")

//     const persist = JSON.parse(persistSerialized)
//     return persist;
// }
