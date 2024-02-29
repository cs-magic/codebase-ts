import { TextareaAuto } from "@/components/textarea"

export default function ConversationPage({
  params: { conversationId },
}: {
  params: { conversationId: string }
}) {
  return (
    <div className={"p-4 h-full flex flex-col"}>
      <div className={"grow"} />
      <TextareaAuto
        className={"w-full border shrink-0 rounded-xl"}
        minRows={2}
        autoFocus
      />
    </div>
  )
}
