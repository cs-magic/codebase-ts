import { cn } from "@/lib/utils"

export const Branding = () => {
  return (
    <h1
      className={cn(
        "text-6xl font-bold primary-gradient flex gap-4",
        // "my-8"
      )}
    >
      搜 嘎
      <span
        className={
          "rotate-12 scale-150 inline-block primary-gradient bg-gradient-to-t"
        }
      >
        {" !"}
      </span>
    </h1>
  )
}
