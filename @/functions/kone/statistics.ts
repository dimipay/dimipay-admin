import { statisticsKone } from "pages/api/statistics"
import { kone } from "./core"

export const getStatistics = kone<statisticsKone["GET"]>("statistics", "GET")
