import { Sidebar } from "@/app/(sub)/c/sidebar"
import { Separator } from "@/components/ui/separator"
import { PropsWithChildren } from "react"

const ChatLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={"w-full grow flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow h-full flex flex-col gap-2"}>{children}</div>
    </div>
  )
}
export default ChatLayout
