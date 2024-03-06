import { DEFAULT_AVATAR } from "@/config/assets"
import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "../../packages/common/components/ui/aspect-ratio"

export interface ISubAppIcon {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  Cover?: string | React.VFC<React.SVGProps<SVGSVGElement>>
  title: string
}

export const SubAppIcon = ({ subAppIcon }: { subAppIcon: ISubAppIcon }) => {
  const { Cover } = subAppIcon
  return (
    <Link
      href={`/${subAppIcon.id}`}
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

      <div className={"text-sm"}>{subAppIcon.title}</div>
    </Link>
  )
}
