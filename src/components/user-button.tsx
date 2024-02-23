"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { IconContainer } from "@/components/containers"
import { CircleUser } from "lucide-react"
import { cn } from "@/lib/utils"

export const UserButton = () => {
  const session = useSession()
  const user = session.data?.user

  return (
    <Link href={user ? "/dashboard" : "/auth"}>
      <IconContainer>
        <CircleUser className={cn(user && "text-green-500")} />
      </IconContainer>
    </Link>
  )
}
