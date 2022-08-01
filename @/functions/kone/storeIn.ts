import { storeKone } from "pages/api/store-in"
import { kone } from "./core"

export const storeIn = kone<storeKone>("store-in", "POST")
