import { otpKone } from "pages/api/pos-device"
import { kone } from "./core"

export const createOtp = kone<otpKone["POST"]>("pos-device/create-otp", "POST")
