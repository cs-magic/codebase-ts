import { Container } from "@/components/containers"
import { getServerSession } from "next-auth"
import { UserButton } from "@/components/user-button"
import { SelectModel } from "@/components/model/select-model"
import { QueryModel } from "@/components/model/query-model"
import { BrandTitle, BrandingFooter } from "@/components/branding"
import { TV } from "@/components/model/tv"

export default async function HomePage() {
  const session = await getServerSession()
  console.log("[HomePage]: ", { session })

  return (
    <Container
      id={"main-container"}
      orientation={"vertical"}
      className={"grow sm:w-3/5 mx-auto flex flex-col justify-start"}
    >
      <div
        className={"min-h-[160px] max-h-[320px] flex flex-col justify-end mb-8"}
      >
        <BrandTitle />
      </div>

      {/*<TV />*/}

      {/*<SelectModel />*/}

      <QueryModel />
    </Container>
  )
}
