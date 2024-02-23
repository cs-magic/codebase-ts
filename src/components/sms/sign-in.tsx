import { useSmsStore } from "@/store/sms.slice"
import { Label } from "@/components/ui/label"
import { EditIcon } from "lucide-react"
import { DigitContainer } from "@/components/containers"
import { useInputVerifyCodes } from "@/hooks/use-input-verify-codes"
import { useSignInResult } from "@/hooks/use-sms-sign-in-result"

export const SmsSignIn = () => {
  useInputVerifyCodes()

  useSignInResult()

  return (
    <div className={"flex flex-col gap-4 w-full items-center"}>
      <Label className={"text-semibold text-lg"}>验证您的手机号</Label>
      <div
        className={
          "text-muted-foreground text-xs flex flex-col items-center gap-2"
        }
      >
        <div>请输入发送到您手机的短信验证码</div>

        <ReInputPhone />
      </div>

      <InputVerifyCode />

      <ResendVerifyCode />
    </div>
  )
}

const ReInputPhone = () => {
  const { phone, setStage } = useSmsStore((state) => ({
    phone: state.phone,
    setStage: state.setStage,
  }))

  return (
    <div className={"font-semibold inline-flex items-center gap-1"}>
      {phone}
      <EditIcon
        className={"w-4 h-4 cursor-pointer"}
        onClick={() => {
          setStage("toSendSms")
        }}
      />
    </div>
  )
}

const InputVerifyCode = () => {
  const { code } = useSmsStore((state) => ({
    code: state.code,
  }))

  return (
    <div className={"flex justify-center gap-2"}>
      {[...Array(6)].map((value, index) => (
        <DigitContainer
          key={index}
          focus={index === code.length}
          value={index < code.length ? code[index] : ""}
          onKeyDown={(event) => {
            event.preventDefault()
          }}
          // suppress (un)control
          onChange={(event) => null}
        />
      ))}
    </div>
  )
}

const ResendVerifyCode = () => {
  const { phone, downtime, sendCode } = useSmsStore((state) => ({
    phone: state.phone,
    downtime: state.downtime,
    sendCode: state.sendCode,
  }))

  return (
    <div className={"text-muted-foreground text-xs flex items-center "}>
      没有收到验证码？
      {downtime <= 0 ? (
        <span
          onClick={() => {
            // currently phone must exist
            sendCode({ phone })
          }}
          className={"hover:text-primary hover:underline cursor-pointer"}
        >
          重新发送
        </span>
      ) : (
        `(${downtime}秒)`
      )}
    </div>
  )
}
