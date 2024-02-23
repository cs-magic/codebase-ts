import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { SMS_CODE_DOWNTIME, SMS_PROVIDER_ID } from "@/config/const"
import { $sendSms } from "@/server/sms"
import { ISendSms, ISmsSignIn } from "@/schema/sms"
import { SetState } from "@/schema/utils"
import { Dispatch, SetStateAction } from "react"
import { signIn } from "next-auth/react"
import { useUiStore } from "@/store/ui.slice"

type SmsStage = "toSendSms" | "toAuth"

// 不需要 persist，用户刷新就全部重置（包括手机号要重新输入，验证码重新发送等）
export interface SmsSlice {
  stage: SmsStage
  setStage: SetState<SmsStage>

  phone: string
  setPhone: SetState<string>

  code: string
  setCode: Dispatch<SetStateAction<string>>

  sendCode: (values: ISendSms) => void
  downtime: number
  sentOk?: boolean

  smsSignIn: () => void
  signInOk?: boolean
}

export const useSmsStore = create<SmsSlice>()(
  immer((setState, getState, store) => ({
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
    setCode: (code) => {
      setState((state) => {
        // todo: generic ?
        state.code = typeof code === "function" ? code(state.code) : code
      })

      // 直接在这里登录，没必要在前端 hook 了
      // attention: 要在外面获取 getState，不能在 setState 里面，里面是 draft
      if (getState().code.length === 6) {
        getState().smsSignIn()
      }
    },

    sendingCodeStatus: "default",
    downtime: 0,
    /**
     * 在 immer 中异步操作的要领，就是不要在 immer 中异步
     */
    sendCode: async (data: ISendSms) => {
      const { phone } = data

      // 同步 immer
      setState((state) => {
        state.phone = phone
      })

      // UI 跨 store 同步
      useUiStore.getState().setLoading(true)
      // 异步
      const res = await $sendSms(phone)
      useUiStore.getState().setLoading(false)

      // 同步 immer
      setState((state) => {
        state.sentOk = res

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

    signInStatus: "default",
    smsSignIn: async () => {
      const values: ISmsSignIn = {
        phone: getState().phone,
        code: getState().code,
      }

      console.log("[sms] sign in: ", values)
      useUiStore.getState().setLoading(true)
      const res = await signIn(SMS_PROVIDER_ID, {
        ...values,
        redirect: false,
      })
      useUiStore.getState().setLoading(false)

      console.log("[sms] sign in result: ", res)

      setState((state) => {
        state.signInOk = res?.ok
      })
    },
  })),
)
