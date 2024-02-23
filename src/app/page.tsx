import { Container } from "@/components/containers"
import { SelectModel } from "@/components/select-model"
import { QueryModel } from "@/components/query-model"
import { getServerSession } from "next-auth"
import { UserButton } from "@/components/user-button"

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
        className={"grow w-full sm:w-3/5 mx-auto"}
      >
        <div>Way To AGI !</div>

        <div className={"w-full"}>
          <SelectModel />
        </div>

        <QueryModel />
      </Container>
    </div>
  )
}
