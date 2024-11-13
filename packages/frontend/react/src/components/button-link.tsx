import Link from "next/link";
import React, { ComponentProps } from "react";

import { cn } from "packages/frontend/frontend-shadcn/src/lib/utils";
import { Button, buttonVariants } from "packages/frontend/frontend-shadcn/src/ui/button";

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
  if (disabled)
    return (
      <div>
        <InnerButton />
      </div>
    );

  return (
    <Link href={href}>
      <InnerButton />
    </Link>
  );
};
