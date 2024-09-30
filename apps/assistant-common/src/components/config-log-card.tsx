import { useAtom } from "jotai";

import { LabelLine } from "@cs-magic/react/components/label-line";
import { SelectLogLevel } from "@cs-magic/react/components/select-log-level";
import { StandardCard } from "@cs-magic/react/components/standard-card";
import { pusherLogLevelAtom } from "@cs-magic/react/store/pusher.atom";

import { TrpcLogEnabled } from "./config-trpc-log-enabled";

export const ConfigLogCard = () => {
  const [pusherLogLevel, setPusherLogLevel] = useAtom(pusherLogLevelAtom);
  // const [routeLogLevel, setRouteLogLevel] = useAtom(routeLogLevelAtom)

  return (
    <StandardCard title={"log"}>
      <TrpcLogEnabled />

      <LabelLine title={"Pusher Log Level"}>
        <SelectLogLevel value={pusherLogLevel} setValue={setPusherLogLevel} />
      </LabelLine>
    </StandardCard>
  );
};
