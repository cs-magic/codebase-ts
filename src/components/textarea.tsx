import {
  Textarea as ShadcnTextarea,
  TextareaProps,
} from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnTextarea
        ref={ref}
        className={cn("resize-none", className)}
        {...props}
      />
    )
  },
)
Textarea.displayName = "Textarea"
