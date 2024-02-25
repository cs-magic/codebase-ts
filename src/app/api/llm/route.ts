"use server"

import { NextRequest } from "next/server"

import { streamManager } from "@/app/api/llm/init"

export async function GET(req: NextRequest) {
  streamManager.printKeys()
}
