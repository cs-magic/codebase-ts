import { CompanyLogo } from "@/components/company-logo";

import bitFont from "../../../../assets/fonts/VonwaonBitmap-16px.ttf";
import { cn } from "@cs-magic/shadcn/dist/lib/utils";

export const CompanySlogan = () => {
  return (
    <div className={"flex items-center gap-4 text-2xl"}>
      {/*<Image src={assets.Logo} alt={'logo'} width={36} height={36}/>*/}
      <CompanyLogo width={36} height={36} />
      <p className={cn("text-xl font-light", bitFont.className)}>
        大模型时代，人人都是魔法师
      </p>
    </div>
  );
};
