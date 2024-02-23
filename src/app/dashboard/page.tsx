"use client"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_AVATAR } from "@/config/const"
import { SignoutButton } from "@/components/sign-out"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const session = useSession()
  const user = session.data?.user

  const router = useRouter()
  useEffect(() => {
    if (!user) return router.push("/")
  }, [user])

  console.log("[DashboardPage]: ", { session, user })

  if (!user) return

  return (
    <Card className={"text-foreground"}>
      <CardHeader>
        <Avatar>
          <AvatarImage src={user.image ?? DEFAULT_AVATAR} />
        </Avatar>

        <CardTitle>{user.name}</CardTitle>
        <CardDescription>id: {user.id}</CardDescription>
      </CardHeader>

      <CardFooter>
        <SignoutButton />
      </CardFooter>
    </Card>
  )
}
