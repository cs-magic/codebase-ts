import { Container } from "@/components/containers"
import { getServerSession } from "next-auth"
import { UserButton } from "@/components/user-button"
import { ConfigApp } from "@/components/model/config-app"
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
      className={"max-w-2xl grow sm:w-3/5 mx-auto flex flex-col justify-start"}
    >
      <div className={"h-1/3 flex flex-col justify-end mb-8"}>
        <BrandTitle />
      </div>

      {/*<TV />*/}

      <ConfigApp />

      <QueryModel />
    </Container>
  )
}
