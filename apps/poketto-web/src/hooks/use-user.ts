"use client"

import { signOut, useSession } from "next-auth/react"

import { api } from "@/lib/api"

export const useUser = () => {
  const { data: session } = useSession()
  const userInSession = session?.user
  const { data: userInDB, isLoading: isLoadingUser } = api.user.getProfile.useQuery(
    { id: userInSession?.id },
    { enabled: !!userInSession?.id },
  )
  if (userInSession && !isLoadingUser && !userInDB) {
    // 数据库不匹配，重置浏览器端
    void signOut()
  }
  const user = userInDB
  return { user, userId: user?.id, isLoadingUser }
}
