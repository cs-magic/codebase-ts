import clsx from "clsx"
import { HTMLProps } from "react"

import CsMagicBlackLogoSvg from "@/branding/cs-magic/cs-magic_logo_1280.svg"
import { LOGO_SIZE_LG } from "@/config"

export const CompanyLogo = ({ className, ...props }: HTMLProps<SVGSVGElement>) => (
  <CsMagicBlackLogoSvg className={clsx("", className)} width={LOGO_SIZE_LG} height={LOGO_SIZE_LG} {...props} />
)
