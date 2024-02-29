"use client"

import { Button } from "@/components/ui/button"
import { checkReConstruction1 } from "./check-re-construction1"
import { checkReConstruction2 } from "./check-reconstruction2"

export default function CheckReconstruction() {
  return (
    <>
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
    </>
  )
}