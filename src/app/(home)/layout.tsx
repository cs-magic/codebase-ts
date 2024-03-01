import { Header } from "@/components/header"
import { PropsWithChildren } from "react"
import { BrandingFooter } from "@/components/footer"

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
