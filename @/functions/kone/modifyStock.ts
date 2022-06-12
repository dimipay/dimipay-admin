import { modifyStockKone } from "pages/api/stock/modify-stock"
import { kone } from "./core"

export const modifyStock = kone<modifyStockKone["POST"]>(
    "stock/modify-stock",
    "POST"
)
