import NeuroraLogoSVG from "@assets/branding/assistant/assistant_logo.svg";

import { LOGO_SIZE_LG } from "@cs-magic/react/config";

export const AssistantBanner = () => {
  return (
    <div className={"flex items-center gap-2 h-full"}>
      <NeuroraLogoSVG width={LOGO_SIZE_LG} height={LOGO_SIZE_LG} />
      <p className={"hidden sm:block text-xl font-semibold uppercase"}>
        Neurora
      </p>
    </div>
  );
};
