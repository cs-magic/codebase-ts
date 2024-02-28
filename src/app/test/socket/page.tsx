"use client"

import { Button } from "@/components/ui/button"
import { useSocketStore } from "@/store/socket"

export default function TestSocketPage() {
  const pusherClient = useSocketStore((state) => state.client)

  return (
    <div>
      <Button
        onClick={() => {
          console.log("sending: ", { pusherClient })
          pusherClient?.send_event("pusher:ping", {})
        }}
      >
        发送数据
      </Button>
    </div>
  )
}
