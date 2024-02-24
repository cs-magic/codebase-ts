export const TODO = "研发小哥正在加🍗中！"

export const SMS_PROVIDER_ID = "sms"

// ref: https://stackoverflow.com/a/16702965/9422455
export const PHONE_REGEX =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/

// todo: server side NODE_ENV
export const SMS_CODE_DOWNTIME = 3
export const SMS_EXPIRE_MINUTES = 10

export const APP_URL = "https://agi.cs-magic.cn"

export const DATETIME_FORMAT = "YYYY-MM-DDThh:mm" // 根据MDN，日期选择组件只能精确到分钟，否则舒昱的iPhone 15 safari上会报错
export const WECHAT_DATETIME_FORMAT = "YYYY-MM-DD hh:mm:ss" // 根据MDN，日期选择组件只能精确到分钟，否则舒昱的iPhone 15 safari上会报错
export const WECHAT_APP_ID = "wx0fca1662e5518990"
export const WECHAT_API_URL = "https://api.weixin.qq.com"
