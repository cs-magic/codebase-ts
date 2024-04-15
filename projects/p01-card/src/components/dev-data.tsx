import { useAtom } from "jotai";
import { devEnabledAtom } from "../../../../packages/common-dev/store";
import { FlexContainer } from "../../../../packages/common-ui/components/flex-container";

export const DevData = () => {
  const [devEnabled] = useAtom(devEnabledAtom);
  if (!devEnabled) return null;

  return (
    <div className={"fixed bottom-6 left-0 w-[240px] p-2"}>
      <FlexContainer orientation={"vertical"}></FlexContainer>
    </div>
  );
};