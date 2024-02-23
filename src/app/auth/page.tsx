"use client"

/**
 * ui ref: https://clerk.com/
 */
import { AuthContainer } from "@/components/containers"
import { SmsSendCode } from "@/components/sms/send-code"
import { SmsSignIn } from "@/components/sms/sign-in"
import { useSmsStore } from "@/store/sms.slice"
import { LoadingAlertDialog } from "@/components/dialog"

export default function AuthPage() {
  const { stage } = useSmsStore()

  const Comp = stage === "toSendSms" ? SmsSendCode : SmsSignIn

  return (
    <AuthContainer>
      <LoadingAlertDialog />

      <Comp />
    </AuthContainer>
  )
}
