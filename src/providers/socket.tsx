"use client"

import { PropsWithChildren, useEffect } from "react"
import { pusherClient } from "@/lib/puser/client/init"

export default function SocketProvider({ children }: PropsWithChildren) {
  /**
   * log state
   */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const f = () => {
      console.log("state: ", pusherClient.connection.state)
      t = setTimeout(f, 3000)
    }
    f()

    return () => {
      clearTimeout(t)
    }
  }, [])

  return <>{children}</>
}
