import { Container } from "@/components/containers"
import { getServerSession } from "next-auth"
import { UserButton } from "@/components/user-button"
import { SelectModel } from "@/components/model/select-model"
import { QueryModel } from "@/components/model/query-model"
import { BrandingTitle, BrandingBanners } from "@/components/branding"
import { TV } from "@/components/model/tv"

export default async function HomePage() {
  const session = await getServerSession()
  console.log("[HomePage]: ", { session })

  return (
    <div className={"w-full h-full p-4 flex flex-col"}>
      <div className={"w-full inline-flex items-center"}>
        <div className={"ml-auto"}>
          <UserButton />
        </div>
      </div>

      <Container
        orientation={"vertical"}
        className={"grow w-full sm:w-3/5 mx-auto "}
      >
        <BrandingTitle />

        {/*<TV />*/}

        <SelectModel />

        <QueryModel />
      </Container>

      <BrandingBanners />
    </div>
  )
}
