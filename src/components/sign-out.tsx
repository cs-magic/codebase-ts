"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export const SignoutButton = () => {
  return (
    <Button
      variant={"destructive"}
      onClick={() => signOut()}
      className={"w-full"}
    >
      退出登录
    </Button>
  )
}
