import { AdminAccount } from "@prisma/client"
import { atom, RecoilState } from "recoil"
import { recoilPersist } from "recoil-persist"
import { ModalContent } from "./components/Modal"
import { PermissionType } from "./schemes"
import { TableRecord } from "./types"

export const LOCALSTORAGE_KEY = "PERSISTENCY"

const { persistAtom } = recoilPersist({
    key: LOCALSTORAGE_KEY,
})

export interface UserAtom {
    user: AdminAccount & {
        AdminRole: {
            permissions: PermissionType | null
        } | null
    }
    token: string
}

export const userAtom = atom<UserAtom | null>({
    default: null,
    key: "USER",
    effects_UNSTABLE: [persistAtom],
})

export const experimentalFlagsAtom = atom<string[]>({
    default: [],
    key: "EXPERIMENTAL_FLAGS",
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

export const batchEditWizardFileAtom = atom<{
    records: (Record<string, string | number | Date | boolean> & {
        id: number
    })[]
    header: string[]
    match?: string[]
    alignField?: string
} | null>({
    default: {
        records: [
            {
                id: 1,
                상품: "롯데칠성)2%부족할때복숭아(캔)240mL",
                매입가격: 5000,
                분류: "빙과",
            },
            {
                id: 2,
                상품: "롯데칠성)잔치집식혜(캔)240mL",
                매입가격: 3000,
                분류: "빙과",
            },
            {
                id: 3,
                상품: "롯데칠성)델몬트스퀴즈포도(캔)240mL",
                매입가격: 2000,
                분류: "음료",
            },
        ],
        header: ["상품", "매입가격", "분류"],
        match: ["name", "purchaseCost", "Category"],
        alignField: "name",
    },
    // default: null,
    key: "BATCH_EDIT_WIZARD_FILE",
})

export const getAtom = <AtomType>(atom: RecoilState<AtomType>): AtomType => {
    const persistSerialized = localStorage.getItem(LOCALSTORAGE_KEY)
    if (!persistSerialized) throw new Error("로그인이 필요해요")

    const persist = JSON.parse(persistSerialized)
    return persist[atom.key]
}

export const modalContentAtom = atom<null | ModalContent>({
    default: null,
    key: "MODAL_CONTENT_ATOM",
})
