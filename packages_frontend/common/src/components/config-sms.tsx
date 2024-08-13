"use client"

import { SmsProviderType } from "@cs-magic/common/dist/sms.schema.js"
import {
  smsCodeToCountdownSecondsAtom,
  smsProviderTypeAtom,
} from "@cs-magic/react-hooks/dist/store/sms.atom.js"
import { StandardCard } from "@cs-magic/react-ui/components/standard-card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@cs-magic/react-ui/dist/shadcn/ui/select.js"
import { Input } from "@cs-magic/react-ui/shadcn/ui/input"
import { Label } from "@cs-magic/react-ui/shadcn/ui/label"

import { useAtom } from "jotai"

export const ConfigSMSCard = () => {
  const [smsProvider, setSmsProvider] = useAtom(smsProviderTypeAtom)
  const [smsCountdownSeconds, setSmsCountdownSeconds] = useAtom(
    smsCodeToCountdownSecondsAtom,
  )
  return (
    <StandardCard title={"SMS"}>
      <Label>Provider Type</Label>
      <Select
        value={smsProvider}
        onValueChange={(s: SmsProviderType) => setSmsProvider(s)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value={"ali" as SmsProviderType}>
              计算机魔法研究（阿里，无白名单）
            </SelectItem>
            <SelectItem value={"tencent" as SmsProviderType}>
              XX的个人博客（腾讯，白名单）
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label>Countdown Time</Label>
      <Input
        value={smsCountdownSeconds}
        onChange={(event) =>
          setSmsCountdownSeconds(Number(event.currentTarget.value))
        }
        type={"number"}
      />
    </StandardCard>
  )
}
