import { cn } from "@cs-magic/shadcn/lib/utils"
import { Button, buttonVariants } from "@cs-magic/shadcn/ui/button"
import Link from "next/link"
import React, { type ComponentProps } from "react"


export const ButtonLink = ({
  href,
  className,
  disabled,
  variant,
  size,
  ...props
}: ComponentProps<typeof Button> & { href: string }) => {
  const InnerButton = () => (
    <Button className={cn(className)} size={size} variant={variant} {...props} />
  )
  if (disabled)
    return (
      <div>
        <InnerButton />
      </div>
    )

  return (
    <Link href={href}>
      <InnerButton />
    </Link>
  )
}
