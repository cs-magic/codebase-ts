import { useKey } from "react-use"
import { useSmsStore } from "@/store/sms.slice"

/**
 * 输入六位验证码，并自动触发登录验证
 */
export const useInputVerifyCodes = () => {
  const setCode = useSmsStore((state) => state.setCode)

  for (const char of "0123456789".split("")) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useKey(char, () => {
      setCode((code) => {
        return code.length < 6 ? code + char : code
      })
    })
  }

  useKey("Backspace", () => {
    setCode((code) => code.slice(0, code.length - 1))
  })
}
