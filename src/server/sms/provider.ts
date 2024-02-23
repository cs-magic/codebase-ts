import Credentials from "next-auth/providers/credentials"
import { SMS_PROVIDER_ID } from "@/config/const"
import { $smsSignIn } from "@/server/sms/functions"

export const SmsProvider = Credentials({
  id: SMS_PROVIDER_ID,
  credentials: {
    phone: { type: "string" },
    code: { type: "string" },
  },
  authorize: (credentials, req) => {
    if (!credentials) throw new Error("no credentials")
    const { code, phone } = credentials
    if (!code || !phone) throw new Error("no phone or code")

    return $smsSignIn(credentials)
  },
})
