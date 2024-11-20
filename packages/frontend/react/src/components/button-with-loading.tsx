import { Button } from "@cs-magic/shadcn/ui/button"
import { LoaderIcon } from "lucide-react"
import React, { type ComponentProps } from "react"


export const ButtonWithLoading = ({
  children,
  disabled,
  loading,
  downtime,
  ...props
}: ComponentProps<typeof Button> & {
  loading?: boolean
  downtime?: number
}) => {
  return (
    <Button disabled={disabled ?? loading ?? (downtime ? downtime > 0 : false)} {...props}>
      {loading ? (
        <LoaderIcon className={"animate-spin"} />
      ) : !downtime || downtime <= 0 ? (
        children
      ) : (
        `${downtime} S`
      )}
    </Button>
  )
}
