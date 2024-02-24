import { Container } from "@/components/containers"
import { getServerSession } from "next-auth"
import { UserButton } from "@/components/user-button"
import { BRANDING_CS_MAGIC_BLUE, BRANDING_V2AGI_DARK_SM } from "@/config/assets"
import { ImageEqualHeight } from "@/components/images"
import { SelectModel } from "@/components/model/select-model"
import { QueryModel } from "@/components/model/query-model"

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
        <Branding />

        <SelectModel />

        <QueryModel />
      </Container>

      <Sponsors />
    </div>
  )
}

const Branding = () => {
  return (
    <h1 className={"text-6xl font-bold my-8 primary-gradient flex gap-4"}>
      搜 嘎
      <span
        className={
          "rotate-12 scale-150 inline-block primary-gradient bg-gradient-to-t"
        }
      >
        {" !"}
      </span>
    </h1>
  )
}

const Sponsors = () => {
  return (
    <div className={"flex justify-center gap-4 mt-auto h-8"}>
      <ImageEqualHeight src={BRANDING_V2AGI_DARK_SM} />
      <ImageEqualHeight src={BRANDING_CS_MAGIC_BLUE} />
    </div>
  )
}
