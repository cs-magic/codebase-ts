import { atom, useAtom } from "jotai";

import { LabelLine } from "@cs-magic/react/components/label-line";
import { Switch } from "@cs-magic/shadcn/ui/switch";

// todo
export const trpcReactLogEnabledAtom = atom(false);

export const TrpcLogEnabled = () => {
  const [trpcReactLogEnabled, setTrpcReactLogEnabled] = useAtom(
    trpcReactLogEnabledAtom,
  );
  return (
    <LabelLine title={"TRPC React Log Enabled"}>
      <Switch
        checked={trpcReactLogEnabled}
        onCheckedChange={setTrpcReactLogEnabled}
      />
    </LabelLine>
  );
};
