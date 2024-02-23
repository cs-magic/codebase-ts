"use server"

import { SMS_PROVIDER_ID } from "@/config/const"
import { db } from "@/server/db"
import { ISmsSignIn, SmsProvider } from "@/schema/sms"
import { $sendSmsViaTencent } from "./providers/tencent"
import { $sendSmsViaAli } from "./providers/ali"
import { v4 } from "uuid"
import moment from "moment"

export const $sendSms = async (
  phone: string,
  provider: SmsProvider = "ali",
) => {
  const code = Math.random().toString().slice(2, 8)

  const smsClientSendCode =
    provider === "ali" ? $sendSmsViaAli : $sendSmsViaTencent
  const ok = await smsClientSendCode(phone, code)

  if (ok) {
    // todo: link account

    const id = {
      providerAccountId: phone,
      provider: SMS_PROVIDER_ID,
    }
    const update = {
      access_token: code,
      // 10 m
      expires_at: Date.now() / 10000 + 10 * 60,
    }
    const account = await db.account.upsert({
      where: {
        provider_providerAccountId: id,
      },
      create: {
        ...id,
        type: "credentials",
        ...update,
        user: {
          create: {
            /**
             * jwt not need this session
             */
            // sessions: {
            //   create: {
            //     sessionToken: v4(),
            //     expires: moment().add(10, "m").toDate(),
            //   },
            // },
          },
        },
      },
      update: update,
    })
    console.log("[sms] account: ", account)
  }
  return ok
}

export const $smsSignIn = async (values: ISmsSignIn) => {
  const { phone, code } = values
  const account = await db.account.findUnique({
    where: {
      provider_providerAccountId: {
        providerAccountId: phone,
        provider: SMS_PROVIDER_ID,
      },
      access_token: code,
    },
    include: { user: true },
  })

  if (!account) throw new Error("account not found")

  const user = account.user

  console.log("[sms] signed in user: ", user)
  return user
}
