import { Header } from "@/components/header"
import { BrandingFooter } from "@/components/branding"
import { PropsWithChildren } from "react"

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />

      <div className={"grow flex flex-col justify-center items-center "}>
        {children}
      </div>

      <BrandingFooter />
    </>
  )
}
