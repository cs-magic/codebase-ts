import {
  Textarea as ShadcnTextarea,
  TextareaProps,
} from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return <ShadcnTextarea className={cn("resize-none", className)} {...props} />
}
