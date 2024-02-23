import { Container, IconContainer } from "@/components/containers"
import { SelectModel } from "@/components/select-model"
import { QueryModel } from "@/components/query-model"
import { CircleUser } from "lucide-react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { cn } from "@/lib/utils"

export default async function HomePage() {
  const session = await getServerSession()

  return (
    <div className={"w-full h-full p-4 flex flex-col"}>
      <div className={"w-full inline-flex items-center"}>
        <div className={"ml-auto"}>
          <Link href={session ? "/dashboard" : "/auth"}>
            <IconContainer>
              <CircleUser className={cn(session && "text-green-500")} />
            </IconContainer>
          </Link>
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
