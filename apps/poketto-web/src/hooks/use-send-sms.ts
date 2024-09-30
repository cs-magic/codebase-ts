"use client"

import { useState } from "react"

import { api } from "@/lib/api"
import { ISendSms } from "@/schema/sms"

export const useSendSms = () => {
  const [sending, setSending] = useState(false)

  const sendSms = api.auth.sendSms.useMutation()

  const send = async (data: ISendSms) => {
    setSending(true)
    const { phone } = data
    const result = await sendSms.mutateAsync({ phone })
    setSending(false)
    return result
  }

  return { sending, send }
}
