import { useSmsStore } from "@/store/sms"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const useSignInResult = () => {
  const { signInOk } = useSmsStore((state) => ({
    signInOk: state.signInOk,
  }))
  const router = useRouter()

  useEffect(() => {
    /**
     * can't redirect in zustand, ref: https://chat.openai.com/c/3af56c80-278c-4890-9976-7a2852843c3b
     */
    if (signInOk === true) router.push("/")
  }, [signInOk])
}
