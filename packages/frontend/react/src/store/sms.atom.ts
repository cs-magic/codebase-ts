import type { Nullable } from "@cs-magic/common/schema/base"
import type { ISendSms, ISmsSignIn, SmsProviderType, SmsStage } from "@cs-magic/common/sms.schema"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"


//////////////////////////////
// base
//////////////////////////////

export const smsProviderTypeAtom = atomWithStorage<SmsProviderType>("sms.provider.type", "ali")
export const smsStageAtom = atom<SmsStage>("toSendSms")
export const userPhoneAtom = atom("")

export const smsCodeAtom = atom("")
export const smsCodeToCountdownSecondsAtom = atomWithStorage(
  "sms.code.countdown",
  60, // seconds
)
export const smsCodeCurCountdownSecondsAtom = atom(0)
export const smsCodeExpireSecondsAtom = atom(10 * 60)

export const smsCodeSentOKAtom = atom<Nullable>(null)

//////////////////////////////
// derived
//////////////////////////////

export const smsSendCodePayloadAtom = atom<ISendSms>(get => ({
  phone: get(userPhoneAtom),
}))
export const smsSignInPayloadAtom = atom<ISmsSignIn>(get => ({
  ...get(smsSendCodePayloadAtom),
  code: get(smsCodeAtom),
}))
