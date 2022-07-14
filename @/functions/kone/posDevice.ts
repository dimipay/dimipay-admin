import { passcodeKone } from "pages/api/pos-device/create-passcode"
import { kone } from "./core"

export const createPasscode = kone<passcodeKone["POST"]>(
    "pos-device/create-passcode",
    "POST",
)
