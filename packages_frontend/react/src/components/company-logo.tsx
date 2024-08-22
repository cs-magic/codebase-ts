import { LOGO_SIZE_LG } from "@/config"
import CsMagicBlackLogoSvg from "@/../../../assets/branding/cs-magic_logo_1280.svg"
import { HTMLProps } from "react"
import clsx from "clsx"

export const CompanyLogo = ({
  className,
  ...props
}: HTMLProps<SVGSVGElement>) => (
  <CsMagicBlackLogoSvg
    className={clsx("", className)}
    width={LOGO_SIZE_LG}
    height={LOGO_SIZE_LG}
    {...props}
  />
)
