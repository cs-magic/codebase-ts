import { UserButton } from "@/components/user-button"
import { IoApps } from "react-icons/io5"
import { IconContainer } from "@/components/containers"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import {
  DEFAULT_AVATAR,
  Text2ImageApp,
  Text2ImageAppSVG,
  Text2TextApp,
  Text2TextAppSVG,
} from "@/config/assets"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export const Header = () => {
  return (
    <div className={"w-full inline-flex items-center gap-2 p-4"}>
      <div className={"grow"} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconContainer>
            <IoApps />
          </IconContainer>
        </DropdownMenuTrigger>

        <DropdownMenuContent className={"mr-2"}>
          <div className={"grid grid-cols-3 max-h-[480px] overflow-auto p-4"}>
            {subAppsIcons.map((subApp, index) => (
              <SubAppIcon subAppIcon={subApp} key={index} />
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserButton />
    </div>
  )
}

export interface ISubAppIcon {
  fromMode: ModeType
  toMode: ModeType
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  Cover?: string | React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SubAppIcon = ({ subAppIcon }: { subAppIcon: ISubAppIcon }) => {
  const { fromMode, toMode, Cover } = subAppIcon
  return (
    <div
      className={
        "w-24 flex flex-col gap-1 items-center rounded-lg p-2 interactive"
      }
    >
      {/*<Text2TextApp className={"w-24 h-24"} />*/}
      <AspectRatio ratio={1}>
        {!Cover || typeof Cover === "string" ? (
          <Image
            src={Cover ?? DEFAULT_AVATAR}
            alt={""}
            fill
            className={"object-cover rounded-lg"}
          />
        ) : (
          <Cover className={"object-cover"} />
        )}
      </AspectRatio>

      <div
        className={"text-sm"}
      >{`${modes[fromMode].label} -> ${modes[toMode].label}`}</div>
    </div>
  )
}

export type ModeType = "text" | "image" | "sound" | "video"
export type IMode = { label: string; id: ModeType }
export const modes: Record<ModeType, IMode> = {
  text: { id: "text", label: "文" },
  image: { id: "image", label: "图" },
  sound: { id: "sound", label: "音" },
  video: { id: "video", label: "视频" },
}
/**
 * todo: images
 */
export const subAppsIcons: ISubAppIcon[] = [
  { fromMode: "text", toMode: "text", Cover: Text2TextAppSVG },
  { fromMode: "text", toMode: "image", Cover: Text2ImageAppSVG },
  { fromMode: "image", toMode: "text" },
  { fromMode: "text", toMode: "sound" },
  { fromMode: "image", toMode: "sound" },
  { fromMode: "sound", toMode: "text" },
  { fromMode: "sound", toMode: "image" },
  { fromMode: "text", toMode: "video" },
  { fromMode: "image", toMode: "video" },
  { fromMode: "sound", toMode: "video" },
  { fromMode: "video", toMode: "text" },
  { fromMode: "video", toMode: "image" },
  { fromMode: "video", toMode: "sound" },
  { fromMode: "video", toMode: "video" },
]
