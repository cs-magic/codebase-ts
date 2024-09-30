import { useAtom } from "jotai";

import { LabelLine } from "@cs-magic/react/components/label-line";
import { StandardCard } from "@cs-magic/react/components/standard-card";
import { devEnabledAtom } from "@cs-magic/react/store/dev.atom";
import { Switch } from "@cs-magic/shadcn/ui/switch";

import { requestsSlideTextVisibleAtom } from "../store/ui.atom";

export const ConfigDevCard = () => {
  const [devEnabled, setDevEnabled] = useAtom(devEnabledAtom);
  const [requestsSlideTextDisplay, setRequestsSlideTextDisplay] = useAtom(
    requestsSlideTextVisibleAtom,
  );

  return (
    <StandardCard title={"Dev"}>
      <LabelLine title={"Dev Enabled"}>
        <Switch checked={devEnabled} onCheckedChange={setDevEnabled} />
      </LabelLine>

      <LabelLine title={"Requests Slide Text On"}>
        <Switch
          checked={requestsSlideTextDisplay}
          onCheckedChange={setRequestsSlideTextDisplay}
        />
      </LabelLine>
    </StandardCard>
  );
};
