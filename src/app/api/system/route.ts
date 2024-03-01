import { spawn } from "child_process"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const payload: string[] = []

  await new Promise((resolve, reject) => {
    const cmd = spawn("which yarn && yarn update", { shell: true })

    cmd.stdout.on("data", (data: Buffer) => {
      console.log(`[cmd] stdout: ${data.toString()}`)
      // payload.stdOut.push(typeof data)
      payload.push(data.toString())
    })

    cmd.stderr.on("data", (data: string) => {
      console.log(`[cmd] stderr: ${data}`)
      payload.push(data)
    })

    cmd.on("error", (error) => {
      console.log(`[cmd] error: ${error.message}`)
      payload.push(error.message)
    })

    cmd.on("close", (code) => {
      console.log(`[cmd] close: child process exited with code ${code}`)
      resolve(true)
    })
  })

  return new Response(payload.join("\n"), { status: 200 })
}
