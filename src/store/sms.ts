import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { SMS_CODE_DOWNTIME } from "@/config/const"
import { $sendSms } from "@/server/sms"
import { ISendSms, ISmsSignIn } from "@/schema/sms"
import { sleep } from "@/lib/utils"
import { SetState } from "@/schema/utils"
import { Dispatch, SetStateAction } from "react"

type SmsStage = "toSendSms" | "toAuth"

// 不需要 persist，用户刷新就全部重置（包括手机号要重新输入，验证码重新发送等）
export interface SmsSlice {
  stage: SmsStage
  setStage: SetState<SmsStage>

  phone: string
  setPhone: SetState<string>

  code: string
  setCode: Dispatch<SetStateAction<string>>

  sendingCode: boolean
  downtime: number
  sendCode: (values: ISendSms) => void

  isSigningIn: boolean
  smsSignIn: (values: ISmsSignIn) => void
}

export const useSmsStore = create<SmsSlice>()(
  immer((setState, getState) => ({
    stage: "toSendSms",
    setStage: (stage) =>
      setState((state) => {
        state.stage = stage
      }),

    phone: "",
    setPhone: (phone) =>
      setState((state) => {
        state.phone = phone
      }),

    code: "",
    setCode: (code) =>
      setState((state) => {
        // todo: generic ?
        state.code = typeof code === "function" ? code(state.code) : code
      }),

    sendingCode: false,
    downtime: 0,
    /**
     * 在 immer 中异步操作的要领，就是不要在 immer 中异步
     */
    sendCode: async (data: ISendSms) => {
      const { phone } = data

      // 同步 immer
      setState((state) => {
        state.phone = phone
        state.sendingCode = true
      })

      // 异步
      const res = await $sendSms(phone)

      // 同步 immer
      setState((state) => {
        state.sendingCode = false

        if (res) {
          state.stage = "toAuth"
          state.downtime = SMS_CODE_DOWNTIME

          const f = () => {
            // 同步 immer
            setState((state) => {
              // 异步
              if (--state.downtime > 0) setTimeout(f, 1000)
            })
          }
          // 异步
          setTimeout(f, 1000)
        }
      })
    },

    isSigningIn: false,
    smsSignIn: async (values) => {
      setState((state) => {
        state.isSigningIn = true
      })
      await sleep(1000)
      setState((state) => {
        state.isSigningIn = false
      })
    },
  })),
)
