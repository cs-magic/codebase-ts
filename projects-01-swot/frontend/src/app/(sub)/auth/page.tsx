"use client"

import { UnexpectedError } from "@cs-magic/common/schema/error"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useEnvironments } from "@cs-magic/common/deps/hooks/use-environments"
import { Label } from "@cs-magic/common/deps/ui-shadcn/components/label"
import { Loading } from "@cs-magic/common/deps/ui/components/loading"
import { Auth } from "../../../components/auth"
import { AuthSmsSignIn } from "../../../components/auth-sms-sign-in"
import { AuthUpdateProfile } from "../../../components/auth-update-profile"
import { AuthWechatSignIn } from "../../../components/auth-wechat-sign-in"

export default function AuthPage() {
  const session = useSession()
  const router = useRouter()
  const { isWechat } = useEnvironments()

  const profileOk = !!session.data?.user?.name && !!session.data.user.image
  const phoneOk = !!session.data?.user?.phone
  const wxidOk = !!session.data?.user?.wxid

  useEffect(() => {
    if (phoneOk && profileOk && (wxidOk || !isWechat)) router.push("/")
  }, [phoneOk, profileOk, wxidOk, isWechat])

  useEffect(() => {
    // if (devEnabled && process.env.NODE_ENV !== "production")
    // toast.info(JSON.stringify(session, null, 2), {
    //   duration: Infinity,
    //   closeButton: true,
    // })
  }, [session])

  switch (session.status) {
    case "authenticated":
      if (!phoneOk) return <AuthSmsSignIn />

      if (isWechat && !wxidOk)
        return (
          <div className={"flex w-full flex-col gap-4"}>
            <Label className={"text-xs text-muted-foreground"}>
              为更好地为阁下提供服务：
            </Label>

            <Label className={"text-xs text-muted-foreground"}>
              首次登录请额外完成微信认证
            </Label>

            <AuthWechatSignIn />
          </div>
        )

      if (!profileOk) return <AuthUpdateProfile />

      return <Loading />

    case "loading":
      return <Loading />

    case "unauthenticated":
      return <Auth />

    default:
      throw new UnexpectedError()
  }
}