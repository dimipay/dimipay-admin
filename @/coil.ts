import { AdminAccount } from "@prisma/client"
import { atom, RecoilState } from "recoil"
import { recoilPersist } from "recoil-persist"
import { ModalContent } from "./components/Modal"
import { PermissionType } from "./schemes"
import { Store, TableRecord } from "./types"

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
    default: null,
    key: "BATCH_EDIT_WIZARD_FILE",
})

export const storeInWizardFileAtom = atom<Store[] | null>({
    // default: [
    //     {
    //         name: "오리온)포카칩어니언1500",
    //         barcode: "8801117760304",
    //         amount: 20,
    //         unitCost: 1030,
    //     },
    //     {
    //         name: "크라운)못말리는신짱(중)18*1500",
    //         barcode: "8801111185066",
    //         amount: 18,
    //         unitCost: 1090,
    //     },
    //     {
    //         name: "오리온)포카칩오리지널1500",
    //         barcode: "8801117760106",
    //         amount: 20,
    //         unitCost: 1030,
    //     },
    //     {
    //         name: "오리온)꼬북칩(콘스프)65g*12*1200",
    //         barcode: "8801117787806",
    //         amount: 12,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)꼬북칩(바닐라맛)65g*24*1200",
    //         barcode: "8801117289607",
    //         amount: 24,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "롯데제과)오징어땅콩1500",
    //         barcode: "8801062385911",
    //         amount: 20,
    //         unitCost: 1030,
    //     },
    //     {
    //         name: "롯데제과)돌아온치토스(매콤한맛)1500",
    //         barcode: "8801062380015",
    //         amount: 16,
    //         unitCost: 1030,
    //     },
    //     {
    //         name: "롯데제과)치토스(스모키)바베큐16*1500",
    //         barcode: "8801062289936",
    //         amount: 16,
    //         unitCost: 1030,
    //     },
    //     {
    //         name: "오리온)돌아온태양의맛썬칩(HOT)64g*24*1500",
    //         barcode: "8801117798208",
    //         amount: 24,
    //         unitCost: 1030,
    //     },
    //     {
    //         name: "오리온)치킨팝(치즈뿌린맛)81g*16*1200",
    //         barcode: "8801117689803",
    //         amount: 16,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)치킨팝(닭강정맛)73g*16*1200",
    //         barcode: "8801117674700",
    //         amount: 16,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "해태제과)구운감자900",
    //         barcode: "8801019602498",
    //         amount: 30,
    //         unitCost: 650,
    //     },
    //     {
    //         name: "농심)켈로그(다크초코&씨솔트)30g*12",
    //         barcode: "8852756504699",
    //         amount: 12,
    //         unitCost: 800,
    //     },
    //     {
    //         name: "농심)켈로그프로틴(그래놀라바)35g*12",
    //         barcode: "8802756120189",
    //         amount: 12,
    //         unitCost: 800,
    //     },
    //     {
    //         name: "농심)켈로그프로틴바(아몬드앤호박씨)30g*12",
    //         barcode: "8852756505191",
    //         amount: 12,
    //         unitCost: 950,
    //     },
    //     {
    //         name: "농심)켈로그(베리앤넛바)에너지바12*1300",
    //         barcode: "8852756505160",
    //         amount: 12,
    //         unitCost: 800,
    //     },
    //     {
    //         name: "농심)켈로그(크런치넛)에너지바30g*1300",
    //         barcode: "8852756055610",
    //         amount: 12,
    //         unitCost: 800,
    //     },
    //     {
    //         name: "농심)켈로그(레드베리)에너지바25g*12",
    //         barcode: "8852756055672",
    //         amount: 12,
    //         unitCost: 800,
    //     },
    //     {
    //         name: "오리온)예감(오리지널)2p*20*1200",
    //         barcode: "8801117282202",
    //         amount: 20,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)예감(치즈그랑탕)2P*20*1200",
    //         barcode: "8801117282301",
    //         amount: 20,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)예감(볶은양파맛)2p*64g*20*1200",
    //         barcode: "8801117139001",
    //         amount: 20,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "롯데제과)칸쵸1000",
    //         barcode: "8801062518210",
    //         amount: 32,
    //         unitCost: 680,
    //     },
    //     {
    //         name: "롯데제과)씨리얼42g*32入*1000",
    //         barcode: "8801062871131",
    //         amount: 32,
    //         unitCost: 680,
    //     },
    //     {
    //         name: "롯데제과)제크(오리지널)지정가*20*1700",
    //         barcode: "8801062870448",
    //         amount: 20,
    //         unitCost: 1160,
    //     },
    //     {
    //         name: "롯데제과)롯데샌드파인애플*30*1700",
    //         barcode: "8801062870509",
    //         amount: 30,
    //         unitCost: 1160,
    //     },
    //     {
    //         name: "크라운)콘치(치즈크림)1500*18",
    //         barcode: "8801111183062",
    //         amount: 18,
    //         unitCost: 1090,
    //     },
    //     {
    //         name: "크라운)콘초18*1500",
    //         barcode: "8801111180993",
    //         amount: 18,
    //         unitCost: 1090,
    //     },
    //     {
    //         name: "해태제과)오사쯔고구마1500",
    //         barcode: "8801019606328",
    //         amount: 16,
    //         unitCost: 1090,
    //     },
    //     {
    //         name: "해태제과)구운양파*20*1500",
    //         barcode: "8801019611049",
    //         amount: 20,
    //         unitCost: 1090,
    //     },
    //     {
    //         name: "롯데제과)마가렛트176g*12*3000",
    //         barcode: "8801062873418",
    //         amount: 12,
    //         unitCost: 2040,
    //     },
    //     {
    //         name: "오리온)다이제(볼)42g*8*1200",
    //         barcode: "8801117481605",
    //         amount: 8,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)미쯔볼(쿠키앤크림)42g*8入*1200",
    //         barcode: "8801117485009",
    //         amount: 8,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)닥터유(단백질볼)지정가48g*8入*1500",
    //         barcode: "8801117482503",
    //         amount: 8,
    //         unitCost: 1030,
    //     },
    //     {
    //         name: "오리온)초코송이50g*24*1000",
    //         barcode: "8801117446901",
    //         amount: 24,
    //         unitCost: 680,
    //     },
    //     {
    //         name: "오리온)샌드(나)58g*1P*20*1100",
    //         barcode: "8801117117504",
    //         amount: 20,
    //         unitCost: 750,
    //     },
    //     {
    //         name: "오리온)다이제샌드1000",
    //         barcode: "8801117117306",
    //         amount: 20,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)고래밥(볶음양념맛)46g*30*800",
    //         barcode: "8801117141301",
    //         amount: 30,
    //         unitCost: 550,
    //     },
    //     {
    //         name: "오리온)고소미*30*1200",
    //         barcode: "8801117282806",
    //         amount: 30,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)젤리데이(포도&복숭아)76g*10*1200",
    //         barcode: "8801117360801",
    //         amount: 10,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)왕꿈틀이 80g*10*1200",
    //         barcode: "8801117361105",
    //         amount: 10,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)마이구미(포도과즙)79g*10*1200",
    //         barcode: "8801117360207",
    //         amount: 10,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)마이구미(복숭아과즙)79g*10*1200",
    //         barcode: "8801117360405",
    //         amount: 10,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)아이셔(츄잉캔디)청포도맛6*42g*1200",
    //         barcode: "8801117344108",
    //         amount: 6,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)아이셔(츄잉캔디)소다맛42g*6*1200",
    //         barcode: "8801117352806",
    //         amount: 6,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "오리온)돌아온배배80g*20*1500",
    //         barcode: "8801117136703",
    //         amount: 20,
    //         unitCost: 1030,
    //     },
    //     {
    //         name: "롯데제과)ABC초코쿠키50g*32*1200",
    //         barcode: "8801062893546",
    //         amount: 32,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "롯데제과)핵짱셔요(후르츠)50g*12*1000",
    //         barcode: "8801062885404",
    //         amount: 12,
    //         unitCost: 680,
    //     },
    //     {
    //         name: "롯데제과)핵짱셔요(죠스)50g*12*1000",
    //         barcode: "8801062002542",
    //         amount: 12,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "롯데제과)핵짱셔요(수박)50g*12*1000",
    //         barcode: "8801062336579",
    //         amount: 12,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "롯데제과)핵짱셔요(청포도)50g*12*1000",
    //         barcode: "8801062007950",
    //         amount: 12,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "크라운)화이트하임47g*18*1400",
    //         barcode: "8801111186230",
    //         amount: 18,
    //         unitCost: 1010,
    //     },
    //     {
    //         name: "크라운)초코하임1400",
    //         barcode: "8801111186209",
    //         amount: 18,
    //         unitCost: 1010,
    //     },
    //     {
    //         name: "해태제과)에이스(지정가)121g*30*1700",
    //         barcode: "8801019315404",
    //         amount: 30,
    //         unitCost: 1240,
    //     },
    //     {
    //         name: "크라운)국희땅콩샌드1200",
    //         barcode: "8801111614344",
    //         amount: 24,
    //         unitCost: 870,
    //     },
    //     {
    //         name: "크라운)새콤달콤딸기500",
    //         barcode: "8801111187992",
    //         amount: 15,
    //         unitCost: 360,
    //     },
    //     {
    //         name: "크라운)새콤달콤복숭아500",
    //         barcode: "8801111188036",
    //         amount: 15,
    //         unitCost: 360,
    //     },
    //     {
    //         name: "크라운)새콤달콤포도500",
    //         barcode: "8801111188012",
    //         amount: 15,
    //         unitCost: 360,
    //     },
    //     {
    //         name: "크라운)마이쮸(포도)800",
    //         barcode: "8801111187893",
    //         amount: 15,
    //         unitCost: 580,
    //     },
    //     {
    //         name: "크라운)마이쮸(복숭아)800",
    //         barcode: "8801111187930",
    //         amount: 15,
    //         unitCost: 580,
    //     },
    //     {
    //         name: "크라운)마이쮸(사과)800",
    //         barcode: "8801111187916",
    //         amount: 15,
    //         unitCost: 580,
    //     },
    //     {
    //         name: "그라운)마이쮸(딸기)800",
    //         barcode: "8801111187879",
    //         amount: 15,
    //         unitCost: 580,
    //     },
    //     {
    //         name: "롯데제과)크런키더블크런치바10*1000",
    //         barcode: "8801062640782",
    //         amount: 10,
    //         unitCost: 680,
    //     },
    //     {
    //         name: "롯데제과)판크런키초콜릿36g*1000",
    //         barcode: "8801062628476",
    //         amount: 12,
    //         unitCost: 680,
    //     },
    //     {
    //         name: "롯데제과)아몬드초코볼42g*10*2000",
    //         barcode: "8801062634330",
    //         amount: 10,
    //         unitCost: 1360,
    //     },
    //     {
    //         name: "대상)청정원(고구마츄)60g*30",
    //         barcode: "8801052004068",
    //         amount: 30,
    //         unitCost: 1800,
    //     },
    //     {
    //         name: "CJ)맛밤*80g*36",
    //         barcode: "8801007022635",
    //         amount: 36,
    //         unitCost: 1800,
    //     },
    //     {
    //         name: "롯데제과)딸기쿠키3600",
    //         barcode: "8801062518470",
    //         amount: 12,
    //         unitCost: 2450,
    //     },
    //     {
    //         name: "롯데제과)애플쨈쿠키3600",
    //         barcode: "8801062248773",
    //         amount: 12,
    //         unitCost: 2450,
    //     },
    //     {
    //         name: "롯데제과)빠다코코넛(지정가)100g*30*1700",
    //         barcode: "8801062870462",
    //         amount: 30,
    //         unitCost: 1160,
    //     },
    //     {
    //         name: "매일)피크닉(사과)팩200ml*24",
    //         barcode: "88002101",
    //         amount: 24,
    //         unitCost: 320,
    //     },
    //     {
    //         name: "매일)피크닉(청포도)팩200ml*24",
    //         barcode: "8801121766347",
    //         amount: 24,
    //         unitCost: 320,
    //     },
    //     {
    //         name: "CJ)맥스봉직화구이(꼬치바오리지날)70g*40入*1500",
    //         barcode: "8801007899923",
    //         amount: 40,
    //         unitCost: 950,
    //     },
    //     {
    //         name: "CJ)맥스봉직화구이(꼬치바청양고추)70g*40入*1500",
    //         barcode: "8801007899947",
    //         amount: 40,
    //         unitCost: 950,
    //     },
    //     {
    //         name: "CJ)맥스봉후랑크(오리지널)70g*40入*1500",
    //         barcode: "8801007824611",
    //         amount: 40,
    //         unitCost: 950,
    //     },
    //     {
    //         name: "CJ)맥스봉후랑크(갈릭)70g*40入*1500",
    //         barcode: "8801007824635",
    //         amount: 40,
    //         unitCost: 950,
    //     },
    //     {
    //         name: "CJ)맥스봉후랑크(청양)70g*40入*1500",
    //         barcode: "8801007824659",
    //         amount: 40,
    //         unitCost: 950,
    //     },
    //     {
    //         name: "삼립)미니(꿀약과)70g*10入*900",
    //         barcode: "8801068026603",
    //         amount: 10,
    //         unitCost: 560,
    //     },
    //     {
    //         name: "수입)m&m엠앤엠즈(피넛)40g",
    //         barcode: "6914973603202",
    //         amount: 12,
    //         unitCost: 720,
    //     },
    //     {
    //         name: "수입)m&m엠앤엠즈(밀크)40g",
    //         barcode: "6914973603189",
    //         amount: 12,
    //         unitCost: 720,
    //     },
    //     {
    //         name: "빙그레)곤약젤리(청포도)130g*30",
    //         barcode: "8801104306300",
    //         amount: 30,
    //         unitCost: 630,
    //     },
    //     {
    //         name: "빙그레)곤약젤리(복숭아)130g*30",
    //         barcode: "8801104306287",
    //         amount: 30,
    //         unitCost: 630,
    //     },
    //     {
    //         name: "수입)하리보(골드베렌)캔디100g*30入*1",
    //         barcode: "4001686301555",
    //         amount: 30,
    //         unitCost: 1350,
    //     },
    //     {
    //         name: "수입)하리보(프루티부시)100g*26",
    //         barcode: "4001686375754",
    //         amount: 26,
    //         unitCost: 1350,
    //     },
    //     {
    //         name: "수입)하리보(그레이프프루트)자몽100g*22",
    //         barcode: "4001686381328",
    //         amount: 22,
    //         unitCost: 1250,
    //     },
    //     {
    //         name: "수입)하리보(스타믹스)캔디100g*26入*1",
    //         barcode: "5012035901738",
    //         amount: 26,
    //         unitCost: 1350,
    //     },
    //     {
    //         name: "서울)카톤(힌우유)200ml*50",
    //         barcode: "8801115114031",
    //         amount: 50,
    //         unitCost: 750,
    //     },
    //     {
    //         name: "서울)카톤(딸기)우유200mL",
    //         barcode: "8801115134435",
    //         amount: 50,
    //         unitCost: 680,
    //     },
    //     {
    //         name: "서울)카톤(초코)우유200mL",
    //         barcode: "8801115134237",
    //         amount: 50,
    //         unitCost: 680,
    //     },
    //     {
    //         name: "빙그레)바나나맛우유240ml*32",
    //         barcode: "88002798",
    //         amount: 32,
    //         unitCost: 900,
    //     },
    //     {
    //         name: "빙그레)요구르트(대)280ml*1",
    //         barcode: "8801104301862",
    //         amount: 1,
    //         unitCost: 820,
    //     },
    //     {
    //         name: "동신)슬리퍼(삼선)240mm*1",
    //         barcode: "8808275757570",
    //         amount: 1,
    //         unitCost: 2100,
    //     },
    //     {
    //         name: "영진)슬리퍼(삼선)250mm*1",
    //         barcode: "8806962500149",
    //         amount: 1,
    //         unitCost: 2100,
    //     },
    //     {
    //         name: "영진)슬리퍼(삼선)260mm*1",
    //         barcode: "8806362500149",
    //         amount: 1,
    //         unitCost: 2100,
    //     },
    //     {
    //         name: "영진)슬리퍼(삼선)270mm*1",
    //         barcode: "8806362500149",
    //         amount: 1,
    //         unitCost: 2100,
    //     },
    //     {
    //         name: "영진)슬리퍼)삼선)280mm*1",
    //         barcode: "8806362500149",
    //         amount: 1,
    //         unitCost: 2100,
    //     },
    //     {
    //         name: "도루코)터치쓰리면도기(3중날)*10",
    //         barcode: "8801038560014",
    //         amount: 10,
    //         unitCost: 380,
    //     },
    // ],
    default: null,
    key: "STORE_IN_WIZARD_FILE",
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
