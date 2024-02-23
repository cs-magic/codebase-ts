"use server"

import { env } from "@/env"
/**
 * `yarn add @alicloud/dysmsapi20170525@2.0.24`
 * ref: https://api.aliyun.com/api/Dysmsapi/2017-05-25/SendSms?params={%22PhoneNumbers%22:%2217766091857%22,%22SignName%22:%22%E8%AE%A1%E7%AE%97%E6%9C%BA%E9%AD%94%E6%B3%95%E7%A0%94%E7%A9%B6%22,%22TemplateCode%22:%22SMS_462000847%22,%22TemplateParam%22:%22%7B%5C%22code%5C%22%3A%5C%22654321%5C%22%7D%22}&tab=DEMO&lang=TYPESCRIPT&accounttraceid=ec0a9e4d8711471c83ea1ac2c172097ecmxf
 */
import Dysmsapi20170525, { SendSmsRequest } from "@alicloud/dysmsapi20170525"
import * as Client from "@alicloud/openapi-client"
import { sleep } from "@/lib/utils"
import { RuntimeOptions } from "@alicloud/tea-util"
import { db } from "@/server/db"
import { SMS_PROVIDER_ID } from "@/config/const"
import { ISmsSignIn } from "@/schema/sms"

const config = new Client.Config({
  // 必填，您的 AccessKey ID
  accessKeyId: env.ALI_AK,
  // 必填，您的 AccessKey Secret
  accessKeySecret: env.ALI_SK,
})

// Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
config.endpoint = `dysmsapi.aliyuncs.com`

const client = new Dysmsapi20170525(config)

export const $sendSms = async (phone: string) => {
  const code = Math.random().toString().slice(2, 8)

  const sendSmsRequest = new SendSmsRequest({
    phoneNumbers: phone,
    signName: "计算机魔法研究",
    templateCode: "SMS_462000847",
    templateParam: JSON.stringify({ code }),
  })
  try {
    console.log("[sms] sending: ", { phone, code })
    // 复制代码运行请自行打印 API 的返回值
    // const res = true
    // await sleep(1000)

    /**
     * {
     *   statusCode: 200,
     *   body: SendSmsResponseBody {
     *     bizId: '532323708714267957^0',
     *     code: 'OK',
     *     message: 'OK',
     *     requestId: '441F81AC-3C53-56E3-8FB7-008901536C23'
     *   }
     * }
     */
    const res = await client.sendSmsWithOptions(
      sendSmsRequest,
      new RuntimeOptions({}),
    )
    console.log("[sms] sent result: ", res)
    const ok = res.statusCode === 200 && res.body.code === "OK"
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
            create: {},
          },
        },
        update: update,
      })
      console.log("[sms] account: ", account)
    }
    return ok
  } catch (err) {
    console.log("[sms] sent error: ", err)
    return false
  }
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

  return account.user
}
