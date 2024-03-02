import { smsState } from "@/store/sms"
import { DigitContainer } from "@/components/containers"
import { useSnapshot } from "valtio"

export const InputVerifyCode = () => {
  const { code } = useSnapshot(smsState)

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