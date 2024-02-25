"use server"

import { streamManager } from "@/app/api/llm/init"

export const checkReConstruction1 = () => {
  streamManager.printKeys("checkReConstruction")
}
