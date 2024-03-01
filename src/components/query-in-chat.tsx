"use client"
import { conversationsState, useQueryInChatLayout } from "@/store/conversation"
import { Textarea } from "@/components/textarea"
import { useSnapshot } from "valtio"

export const QueryInChatLayout = () => {
  const { queryInChatLayout } = useQueryInChatLayout()
  const { conversationId } = useSnapshot(conversationsState)

  return (
    <div className={"p-2 flex justify-center shrink-0"}>
      <Textarea
        minRows={2}
        className={"rounded-lg border  w-full max-w-[720px] p-2 "}
        onQuery={(s) => queryInChatLayout(conversationId, s)}
      />
    </div>
  )
}
