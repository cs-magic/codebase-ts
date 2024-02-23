import { useSmsStore } from "@/store/sms.slice"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

export const useSignInResult = () => {
  const { signInStatus } = useSmsStore((state) => ({
    signInStatus: state.signInOk,
  }))
  const router = useRouter()

  useEffect(() => {
    switch (signInStatus) {
      case true:
        toast.success("登录成功！")
        router.push("/")
        break

      case false:
        toast.error("登录失败！")
        break

      default:
        break
    }
  }, [signInStatus])
}
