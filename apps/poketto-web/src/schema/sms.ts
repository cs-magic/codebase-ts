import * as z from "zod"

import { PHONE_REGEX } from "@/config"

export enum SmsStep {
  toSendCode,
  toLogin,
}

export const sendSmsSchema = z.object({
  phone: z.string().refine((s) => PHONE_REGEX.test(s), "手机号格式不正确"),
})
export type ISendSms = z.infer<typeof sendSmsSchema>

export const smsLoginSchema = sendSmsSchema.and(
  z.object({
    code: z.string().refine((s) => /\d{6}/.test(s), "验证码格式不正确"),
  }),
)
export type ISms = z.infer<typeof smsLoginSchema>
