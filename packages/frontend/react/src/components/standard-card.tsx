
import { cn } from "@cs-magic/shadcn/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@cs-magic/shadcn/ui/card"
import React, { type HTMLAttributes } from "react"

export const StandardCard = ({
  title,
  children,
  type = "beauty",
  className,
  ...props
}: {
  title: string
  type?: "normal" | "beauty"
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <Card className={cn("w-full", type === "beauty" && "border-none", className)} {...props}>
      <CardHeader className={cn(type === "beauty" && "p-2")}>
        <CardTitle className={cn(type === "beauty" && "text-primary-foreground")}>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className={cn("flex flex-col gap-4", type === "beauty" && "p-2")}>
        {children}
      </CardContent>
    </Card>
  )
}
