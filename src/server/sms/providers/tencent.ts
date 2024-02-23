/**
 * `yarn add net tls`
 */
import { v20210111 } from "tencentcloud-sdk-nodejs-sms/tencentcloud/services/sms/v20210111"
import { env } from "@/env"
import { SMS_EXPIRE_MINUTES } from "@/config/const"

export const TENCENT_SMS_SIGN_NAME = "邢健的个人博客"
export const TENCENT_SMS_APP_ID = "1400518792"
export const TENCENT_SMS_TEMPLATE_ID = "2064119"
export const TENCENT_SMS_ENDPOINT = "sms.tencentcloudapi.com"
export const TENCENT_SMS_REGION = "ap-beijing"

export const smsTencentClient = new v20210111.Client({
  // 为了保护密钥安全，建议将密钥设置在环境变量中或者配置文件中，请参考本文凭证管理章节。
  // 硬编码密钥到代码中有可能随代码泄露而暴露，有安全隐患，并不推荐。
  credential: {
    secretId: env.TENCENT_AK,
    secretKey: env.TENCENT_SK,
  },
  // 产品地域
  region: TENCENT_SMS_REGION,
  // 可选配置实例
  profile: {
    httpProfile: {
      endpoint: TENCENT_SMS_ENDPOINT,
      headers: {
        // 自定义 header
      },
      // proxy: "http://127.0.0.1:8899" // http请求代理
    },
  },
})

export const $sendSmsViaTencent = async (phone: string, code: string) => {
  const params = {
    PhoneNumberSet: [phone],
    SmsSdkAppId: TENCENT_SMS_APP_ID,
    SignName: TENCENT_SMS_SIGN_NAME,
    TemplateId: TENCENT_SMS_TEMPLATE_ID,
    TemplateParamSet: [code, `${SMS_EXPIRE_MINUTES}`],
  }
  const res = await smsTencentClient.SendSms(params)
  console.log("[sms] response: ", res)

  const message = res?.SendStatusSet![0]!.Code
  return message === "Ok"
}