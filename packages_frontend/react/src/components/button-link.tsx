import Link from "next/link"
import React, { ComponentProps } from "react"

import { cn } from "@cs-magic/shadcn/dist/lib/utils"
import { Button, buttonVariants } from "@cs-magic/shadcn/dist/ui/button"

export const ButtonLink = ({
  href,
  className,
  disabled,
  ...props
}: ComponentProps<typeof Button> & { href: string }) => {
  const InnerButton = () => <Button className={cn(buttonVariants(), "w-full", className)} {...props} />
  if (disabled) return <InnerButton />

  return (
    <Link href={href}>
      <InnerButton />
    </Link>
  )
}
