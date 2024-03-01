import { Header } from "@/components/header"
import { PropsWithChildren } from "react"
import { BrandingFooter } from "@/components/footer"

export default function SubLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header withBrand />

      <div
        className={
          "grow flex flex-col overflow-auto justify-center items-center "
        }
      >
        {children}
      </div>

      {/*<BrandingFooter />*/}
    </>
  )
}
