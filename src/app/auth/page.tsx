"use client"

/**
 * ui ref: https://clerk.com/
 */
import { AuthContainer } from "@/components/containers"
import { SmsSendCode } from "@/components/sms/send-code"
import { SmsSignIn } from "@/components/sms/sign-in"
import { useSmsStore } from "@/store/sms.slice"
import { useEffect } from "react"
import { toast } from "sonner"
import { LoadingAlertDialog } from "@/components/dialog"

export default function AuthPage() {
  const { stage, sentOk } = useSmsStore()

  const Comp = stage === "toSendSms" ? SmsSendCode : SmsSignIn

  // 发送验证码的 effect 需要在父级监听，否则就被子组件切掉了
  useEffect(() => {
    switch (sentOk) {
      case true:
        toast.success("验证码发送成功，请及时查收！")
        break
      case false:
        toast.error("验证码发送失败！")
        break
      default:
        break
    }
  }, [sentOk])

  return (
    <AuthContainer>
      <LoadingAlertDialog />

      <Comp />
    </AuthContainer>
  )
}
