import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { SMS_CODE_DOWNTIME } from "@/config/const"

type SmsStage = "toSendSms" | "toAuth"

// 不需要 persist，用户刷新就全部重置（包括手机号要重新输入，验证码重新发送等）
export interface SmsSlice {
  stage: SmsStage
  phone: string | null
  code: string | null
  codeDowntime: number

  setStage: (stage: SmsStage) => void
  setPhone: (phone: string) => void
  setCode: (code: string) => void
  sendSms: () => void
}

export const useSmsStore = create<SmsSlice>()(
  immer((setState, getState) => ({
    stage: "toSendSms",
    phone: null,
    code: null,
    codeDowntime: 0,

    setStage: (stage) =>
      setState((state) => {
        state.stage = stage
      }),
    setPhone: (phone) =>
      setState((state) => {
        state.phone = phone
      }),

    setCode: (code) =>
      setState((state) => {
        state.code = code
      }),

    sendSms: () =>
      setState((state) => {
        state.codeDowntime = SMS_CODE_DOWNTIME
        const f = () => {
          setState((state) => {
            if (--state.codeDowntime > 0) setTimeout(f, 1000)
          })
        }
        setTimeout(f, 1000)
      }),
  })),
)
