import { useAtom } from "jotai"

import { requestsSlideTextVisibleAtom } from "../store/ui.atom"
import { StandardCard } from "@cs-magic/react-ui/components/standard-card"
import { devEnabledAtom } from "@cs-magic/react-hooks/dist/store/dev.atom.js"
import { LabelLine } from "@cs-magic/react-ui/components/label-line"
import { Switch } from "@cs-magic/react-ui/shadcn/ui/switch"

export const ConfigDevCard = () => {
  const [devEnabled, setDevEnabled] = useAtom(devEnabledAtom)
  const [requestsSlideTextDisplay, setRequestsSlideTextDisplay] = useAtom(
    requestsSlideTextVisibleAtom,
  )

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
  )
}
