"use client"

/**
 * ui ref: https://clerk.com/
 */
import { AuthContainer } from "@/components/containers"
import { SmsSend } from "@/components/sms/send"
import { SmsSignIn } from "@/components/sms/sign-in"
import { useSmsStore } from "@/store/sms"

export default function AuthPage() {
  const { stage } = useSmsStore()

  const Comp = stage === "toSendSms" ? SmsSend : SmsSignIn

  return (
    <AuthContainer>
      <Comp />
    </AuthContainer>
  )
}
