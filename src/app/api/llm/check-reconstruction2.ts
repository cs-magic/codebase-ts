"use server"

import { streamManager } from "@/app/api/llm/init"

export const checkReConstruction2 = () => {
  streamManager.printKeys("checkReConstruction2")
}
