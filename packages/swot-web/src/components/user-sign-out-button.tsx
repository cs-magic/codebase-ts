import { Button } from "@cs-magic/react-ui"
import { signOut } from "next-auth/react"

export const UserSignOutButton = () => {
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
