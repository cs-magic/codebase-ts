"use server"

/**
 * ref: https://api.aliyun.com/api/Dysmsapi/2017-05-25/SendSms?params={%22PhoneNumbers%22:%2217766091857%22,%22SignName%22:%22%E8%AE%A1%E7%AE%97%E6%9C%BA%E9%AD%94%E6%B3%95%E7%A0%94%E7%A9%B6%22,%22TemplateCode%22:%22SMS_462000847%22,%22TemplateParam%22:%22%7B%5C%22code%5C%22%3A%5C%22654321%5C%22%7D%22}&tab=DEMO&lang=TYPESCRIPT&accounttraceid=ec0a9e4d8711471c83ea1ac2c172097ecmxf
 */
import Dysmsapi20170525, { SendSmsRequest } from "@alicloud/dysmsapi20170525"
import * as Client from "@alicloud/openapi-client"
import { RuntimeOptions } from "@alicloud/tea-util"

import { baseEnv } from "@/env.mjs"

let config = new Client.Config({
  // 必填，您的 AccessKey ID
  accessKeyId: baseEnv.ALI_AK,
  // 必填，您的 AccessKey Secret
  accessKeySecret: baseEnv.ALI_SK,
})

// Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
config.endpoint = `dysmsapi.aliyuncs.com`

const client = new Dysmsapi20170525(config)

export const sendSms = async (phone: string) => {
  const code = Math.random().toString().slice(2, 8)

  let sendSmsRequest = new SendSmsRequest({
    phoneNumbers: phone,
    signName: "计算机魔法研究",
    templateCode: "SMS_462000847",
    templateParam: JSON.stringify({ code }),
  })
  try {
    console.log("[sms] sending: ", { phone, code })
    // 复制代码运行请自行打印 API 的返回值
    const res = await client.sendSmsWithOptions(sendSmsRequest, new RuntimeOptions({}))
    console.log("[sms] sent result: ", res)
    return true
  } catch (err) {
    console.log("[sms] sent error: ", err)
    return false
  }
}
