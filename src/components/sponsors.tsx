import { ImageEqualHeight } from "@/components/images"
import { BRANDING_CS_MAGIC_BLUE, BRANDING_V2AGI_DARK_SM } from "@/config/assets"

export const Sponsors = () => {
  return (
    <div className={"flex justify-center gap-4 mt-auto h-8"}>
      <ImageEqualHeight src={BRANDING_V2AGI_DARK_SM} />
      <ImageEqualHeight src={BRANDING_CS_MAGIC_BLUE} />
    </div>
  )
}
