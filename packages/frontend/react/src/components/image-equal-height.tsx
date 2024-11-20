import { cn } from "@cs-magic/shadcn/lib/utils"
import Image from "next/image"
import React, { type ComponentProps } from "react"


export const ImageEqualHeight = ({
  src,
  alt = "",
  width = 320,
  height = 120,
  className,
}: Omit<ComponentProps<typeof Image>, "alt"> & { alt?: string }) => {
  return (
    <Image
      alt={alt}
      className={cn("h-full w-auto", className)}
      height={height}
      src={src}
      width={width}
    />
  )
}
