import { UserButton } from "@/components/user-button"
import { IoApps } from "react-icons/io5"
import { IconContainer } from "@/components/containers"

export const Header = () => {
  return (
    <div className={"w-full inline-flex items-center gap-2 p-2"}>
      <div className={"grow"} />
      <IconContainer>
        <IoApps />
      </IconContainer>

      <UserButton />
    </div>
  )
}
