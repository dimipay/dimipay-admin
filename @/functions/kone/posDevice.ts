import { otpKone } from "pages/api/pos-device/create-otp"
import { kone } from "./core"

export const createOtp = kone<otpKone["POST"]>("pos-device/create-otp", "POST")
