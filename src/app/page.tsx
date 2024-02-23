import { Container } from "@/components/containers"
import { SelectModel } from "@/components/select-model"
import { QueryModel } from "@/components/query-model"

export default function HomePage() {
  return (
    <Container orientation={"vertical"}>
      <div>Way To AGI !</div>

      <SelectModel />

      <QueryModel />
    </Container>
  )
}
