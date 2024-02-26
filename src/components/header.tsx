import { UserButton } from "@/components/user-button"
import { IoApps } from "react-icons/io5"

export const Header = () => {
  return (
    <div className={"w-full inline-flex items-center gap-2 p-2"}>
      <div className={"grow"} />
      <IoApps className={"w-6 h-6"} />
      <UserButton />
    </div>
  )
}
