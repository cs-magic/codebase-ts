"use client"

import { Button } from "@/components/ui/button"
import { pusherClient } from "@/lib/puser/client/init"
import { EventType } from "@/lib/puser/schema"
import { useEffect } from "react"

export default function TestSocketPage() {
  return (
    <div>
      <Button
        onClick={() => {
          pusherClient.send_event("ping" as EventType, {})
        }}
      >
        发送数据
      </Button>
    </div>
  )
}
