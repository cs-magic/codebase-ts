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
    <div className={"p-4 w-full flex flex-col items-center justify-center"}>
      <Container
        orientation={"vertical"}
        className={"grow w-full sm:w-3/5 mx-auto "}
      >
        <BrandTitle />

        <div className={"h-4"} />

        {/*<TV />*/}

        <SelectModel />

        <QueryModel />
      </Container>
    </div>
  )
}
