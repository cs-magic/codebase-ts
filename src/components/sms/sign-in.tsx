import { useSmsStore } from "@/store/sms"
import { Label } from "@/components/ui/label"
import { EditIcon } from "lucide-react"
import { DigitContainer } from "@/components/containers"
import { useInputVerifyCodes } from "@/hooks/use-input-verify-codes"
import { ButtonWithLoading } from "@/components/buttons"

export const SmsSignIn = () => {
  const { phone, setStage, downtime, sendCode, isSigningIn, code } =
    useSmsStore()

  useInputVerifyCodes()

  return (
    <div className={"flex flex-col gap-4 w-full items-center"}>
      <Label className={"text-semibold text-lg"}>验证您的手机号</Label>
      <div
        className={
          "text-muted-foreground text-xs flex flex-col items-center gap-2"
        }
      >
        <div>请输入发送到您手机的短信验证码</div>
        <div className={"font-semibold inline-flex items-center gap-1"}>
          {phone}
          <EditIcon
            className={"w-4 h-4 cursor-pointer"}
            onClick={() => {
              setStage("toSendSms")
            }}
          />
        </div>
      </div>

      <div className={"flex justify-center gap-2"}>
        {[...Array(6)].map((value, index) => (
          <DigitContainer
            key={index}
            focus={index === code.length}
            value={index < code.length ? code[index] : ""}
            onKeyDown={(event) => {
              event.preventDefault()
            }}
            onChange={(event) => null}
          />
        ))}
      </div>

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

      {isSigningIn && (
        <ButtonWithLoading className={"w-full"} loading={isSigningIn} />
      )}
    </div>
  )
}
