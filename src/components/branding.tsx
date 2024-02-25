import { cn } from "@/lib/utils"
import { BRANDING_V2AGI_DARK_SM, SokkaBrand } from "@/config/assets"
import { ImageEqualHeight } from "@/components/images"
import {
  INDIES_AVATARS,
  SHOW_PARTNERS,
  SPONSORS_BANNERS,
} from "@/config/system"
import { SeparatorContainer } from "@/components/containers"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export const BrandingTitle = () => {
  return (
    <h1 className={cn("text-6xl font-bold primary-gradient flex gap-4 mb-4")}>
      搜 嘎
      <span
        className={
          "rotate-12 scale-150 inline-block primary-gradient bg-gradient-to-t"
        }
      >
        {" !"}
      </span>
    </h1>
  )
}

export const BrandingBanners = () => {
  const enterprises = [BRANDING_V2AGI_DARK_SM]

  return (
    <div className={"flex flex-col items-center gap-2"}>
      {/*  founders */}
      <div className={"flex justify-center gap-4 mt-auto h-8"}>
        <SokkaBrand className={"h-full w-auto"} />

        {enterprises.map((item) => (
          <ImageEqualHeight src={item} key={item} />
        ))}
      </div>

      {SHOW_PARTNERS && <Partners />}
    </div>
  )
}

export const Partners = () => {
  return (
    <>
      {!!SPONSORS_BANNERS.length && (
        <>
          <SeparatorContainer>合作伙伴</SeparatorContainer>
          <div className={"flex justify-center gap-4 mt-auto h-8"}>
            {SPONSORS_BANNERS.map((item) => (
              <ImageEqualHeight src={item} key={item} />
            ))}
          </div>
        </>
      )}

      {/*  individual */}
      {!!INDIES_AVATARS.length && (
        <>
          <SeparatorContainer>独立开发者</SeparatorContainer>
          <div className={"flex justify-center gap-4 mt-auto"}>
            {INDIES_AVATARS.map((item) => (
              <Avatar key={item}>
                <AvatarImage src={item} />
              </Avatar>
            ))}
          </div>
        </>
      )}
    </>
  )
}
