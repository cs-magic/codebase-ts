import { useAtom } from "jotai";

import { FlexContainer } from "@cs-magic/react/components/flex-container";
import { devEnabledAtom } from "@cs-magic/react/store/dev.atom";

export const DevData = () => {
  const [devEnabled] = useAtom(devEnabledAtom);
  if (!devEnabled) return null;

  return (
    <div className={"fixed bottom-6 left-0 w-[240px] p-2"}>
      <FlexContainer orientation={"vertical"}></FlexContainer>
    </div>
  );
};
