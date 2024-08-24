import Link from "next/link"
import React, { ComponentProps } from "react"

import { Button, buttonVariants } from "@cs-magic/shadcn/dist/ui/button"
import { cn } from "@cs-magic/shadcn/dist/lib/utils"

export const ButtonLink = ({
  href,
  className,
  disabled,
  ...props
}: ComponentProps<typeof Button> & { href: string }) => {
  const InnerButton = () => (
    <Button className={cn(buttonVariants(), "w-full", className)} {...props} />
  )
  if (disabled) return <InnerButton />

  return (
    <Link href={href}>
      <InnerButton />
    </Link>
  )
}
