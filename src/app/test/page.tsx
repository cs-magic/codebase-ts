"use client"

import { Container } from "@/components/containers"
import { Button } from "@/components/ui/button"
import { checkReConstruction1 } from "@/app/api/llm/check-re-construction1"
import { checkReConstruction2 } from "@/app/api/llm/check-reconstruction2"

export default function TestPage() {
  return (
    <Container orientation={"vertical"}>
      <Button onClick={() => checkReConstruction1()}>
        checkReConstruction 1
      </Button>

      <Button onClick={() => checkReConstruction2()}>
        checkReConstruction 2
      </Button>

      <Button
        onClick={() => {
          void fetch("/api/llm2")
        }}
      >
        checkReConstruction 3
      </Button>
    </Container>
  )
}
