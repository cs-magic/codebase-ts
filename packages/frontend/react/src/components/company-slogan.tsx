import { cn } from "@cs-magic/shadcn/lib/utils"

import { CompanyLogo } from "@/components/company-logo"

export const CompanySlogan = () => {
  return (
    <div className={"flex items-center gap-2 sm:gap-4 text-2xl"}>
      {/*<Image src={assets.Logo} alt={'logo'} width={36} height={36}/>*/}
      <CompanyLogo width={36} height={36} />
      <p className={cn("text-base sm:text-xl font-light")}>大模型时代，人人都是魔法师</p>
    </div>
  )
}
