import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div
      className={
        "w-full h-full flex flex-col items-center justify-center gap-8"
      }
    >
      <h2>这是一个连 AI 都感到寂寞的地方 :(</h2>
      <Link href="/">
        <Button>返回 AI 的大家族</Button>
      </Link>
    </div>
  )
}
