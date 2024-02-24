"use server"

import { Container } from "@/components/containers"
import { getServerSession } from "next-auth"
import { UserButton } from "@/components/user-button"
import { SelectModel } from "@/components/model/select-model"
import { QueryModel } from "@/components/model/query-model"
import { Branding } from "@/components/branding"
import { Sponsors } from "@/components/sponsors"

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
