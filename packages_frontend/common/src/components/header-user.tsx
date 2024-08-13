"use client"

import { IconContainer } from "@cs-magic/react-ui/dist/components/icon-container.js"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { CircleUser } from "lucide-react"
import { cn } from "@cs-magic/react-ui/shadcn/utils"

export const UserButton = () => {
  const session = useSession()
  const user = session.data?.user

  return (
    <Link href={user ? "/dashboard" : "/auth"}>
      <IconContainer size={"lg"}>
        <CircleUser className={cn(user && "text-primary-foreground")} />
      </IconContainer>
    </Link>
  )
}
