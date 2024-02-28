import { Container } from "@/components/containers"
import { PropsWithChildren } from "react"

export default function TestLayout({ children }: PropsWithChildren) {
  return <Container orientation={"vertical"}>{children}</Container>
}
