import Link from "next/link"
import React, { ComponentProps } from "react"

import { buttonVariants } from "@/shadcn/ui/button"
import { cn } from "@/shadcn/utils"

export const ButtonLink = ({
  href,
  className,
  ...props
}: ComponentProps<typeof Link>) => (
  <Link
    href={href}
    className={cn(buttonVariants(), "w-full", className)}
    {...props}
  />
)
