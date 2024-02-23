import { useKey } from "react-use"
import { useSmsStore } from "@/store/sms"

export const useInputVerifyCodes = () => {
  const [code, setCode] = useSmsStore((state) => [state.code, state.setCode])

  for (const char of "0123456789".split("")) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useKey(char, () => {
      setCode((code) => code + char)
    })
  }

  useKey("Backspace", () => {
    setCode((code) => code.slice(0, code.length - 1))
  })

  console.log({ code })
}
