import Link from "next/link";
import React, { ComponentProps } from "react";

import { cn } from "@cs-magic/shadcn/lib/utils";
import { Button, buttonVariants } from "@cs-magic/shadcn/ui/button";

export const ButtonLink = ({
  href,
  className,
  disabled,
  variant,
  size,
  ...props
}: ComponentProps<typeof Button> & { href: string }) => {
  const InnerButton = () => (
    <Button
      className={cn(className)}
      variant={variant}
      size={size}
      {...props}
    />
  );
  if (disabled) return <InnerButton />;

  return (
    <Link href={href}>
      <InnerButton />
    </Link>
  );
};
