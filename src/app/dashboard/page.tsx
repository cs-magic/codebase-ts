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

export default function DashboardPage() {
  const session = useSession()
  const user = session.data?.user

  console.log("[DashboardPage]: ", { user })

  if (!user) return "loading user..."

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
