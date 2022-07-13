import { JWT_SECRET } from "@/constants"
import jwt from "jsonwebtoken"

export type JsonObject = { [Key in string]?: JsonValue }

export type JsonArray = Array<JsonValue>

export type JsonValue =
    | string
    | number
    | boolean
    | Date
    | JsonObject
    | JsonArray
    | null

export const createJWT = (content: JsonObject) => {
    const token = jwt.sign(content, JWT_SECRET, { expiresIn: "1h" })
    return token
}

export const verifyJWT = <T>(token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET) as T
    } catch (e) {
        return false
    }
}
