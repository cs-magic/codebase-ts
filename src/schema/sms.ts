import { z } from "zod"
import { PHONE_REGEX } from "@/config/const"

export const sendSmsSchema = z.object({
  phone: z.string().refine((s) => PHONE_REGEX.test(s), "手机号格式不合法"),
})
export type ISendSms = z.infer<typeof sendSmsSchema>

export const smsSignInSchema = sendSmsSchema.and(
  z.object({
    code: z.string().refine((s) => /\d{6}/.test(s), "验证码格式不合法"),
  }),
)
export type ISmsSignIn = z.infer<typeof smsSignInSchema>

export type SmsProvider =
  // 计算机魔法研究，无白名单
  | "ali"
  // 邢健的个人博客，有白名单
  | "tencent"
