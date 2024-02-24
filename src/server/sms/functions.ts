"use server"

import { db } from "@/server/db"
import { ISmsSignIn } from "@/schema/sms"
import { $sendSmsViaTencent } from "./providers/tencent"
import { $sendSmsViaAli } from "./providers/ali"
import { SMS_PROVIDER_ID, USE_ALI_SMS, USE_TENCENT_SMS } from "@/config/system"

export const $sendSms = async (phone: string) => {
  const code = Math.random().toString().slice(2, 8)

  let smsClientSendCode
  if (USE_ALI_SMS) smsClientSendCode = $sendSmsViaAli
  else if (USE_TENCENT_SMS) smsClientSendCode = $sendSmsViaTencent
  else {
    console.error("[sms] no sms client enabled")
    return false
  }

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
