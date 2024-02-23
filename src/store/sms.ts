import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { SMS_CODE_DOWNTIME } from "@/config/const"
import { $sendSms } from "@/server/sms"
import { ISendSms } from "@/schema/sms"

type SmsStage = "toSendSms" | "toAuth"

// 不需要 persist，用户刷新就全部重置（包括手机号要重新输入，验证码重新发送等）
export interface SmsSlice {
  stage: SmsStage
  setStage: (stage: SmsStage) => void

  sendingCode: boolean
  codeDowntime: number
  sendCode: (values: ISendSms) => void
}

export const useSmsStore = create<SmsSlice>()(
  immer((setState, getState) => ({
    stage: "toSendSms",
    sendingCode: false,
    codeDowntime: 0,

    setStage: (stage) =>
      setState((state) => {
        state.stage = stage
      }),

    sendCode: (data: ISendSms) =>
      setState((state) => {
        state.sendingCode = true
        // todo: async/await
        void $sendSms(data.phone)
          .catch(console.error)
          .then((res) => {
            setState((state) => {
              state.sendingCode = false
              if (res) {
                state.stage = "toAuth"

                state.codeDowntime = SMS_CODE_DOWNTIME

                const f = () => {
                  setState((state) => {
                    if (--state.codeDowntime > 0) setTimeout(f, 1000)
                  })
                }
                setTimeout(f, 1000)
              }
            })
          })
      }),
  })),
)
