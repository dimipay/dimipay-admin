import { JWT_SECRET } from "@/constants"
import jwt from "jsonwebtoken"

export type JsonObject = { [Key in string]?: JsonValue }

export interface JsonArray extends Array<JsonValue> { }

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

export const verifyJWT = (token: string) => {
    const content = jwt.verify(token, JWT_SECRET)
    return content
}