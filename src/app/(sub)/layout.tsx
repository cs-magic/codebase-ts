import { Header } from "@/components/header"
import { BrandingFooter } from "@/components/branding"
import { PropsWithChildren } from "react"

export default function SubLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header withBrand />

      <div className={"grow flex flex-col justify-center items-center "}>
        {children}
      </div>

      <BrandingFooter />
    </>
  )
}
