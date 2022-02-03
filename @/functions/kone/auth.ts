import { loginKone } from "pages/api/login"
import { kone } from "./core"

export const login = kone<loginKone["POST"]>("login", "POST")
