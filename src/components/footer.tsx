import { SokkaBrand, V2AGIBrand } from "@/config/assets"
import { ImageEqualHeight } from "@/components/images"
import { SHOW_PARTNERS } from "@/config/system"
import { AppStatus, Partners } from "@/components/branding"

export const BrandingFooter = () => {
  const enterprises: string[] = []

  return (
    <div className={"flex flex-col items-center gap-2 mt-auto p-4"}>
      {/*  founders */}
      <div
        className={"w-full flex justify-center items-center gap-4 mt-auto h-8"}
      >
        <SokkaBrand className={"h-full w-auto"} />

        <V2AGIBrand className={"h-full w-auto text-primary"} />

        {enterprises.map((item) => (
          <ImageEqualHeight src={item} key={item} />
        ))}
      </div>

      {SHOW_PARTNERS && <Partners />}
    </div>
  )
}
