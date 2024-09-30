"use client";

import { useAtom } from "jotai";

import { SmsProviderType } from "@cs-magic/common/sms.schema";
import { StandardCard } from "@cs-magic/react/components/standard-card";
import {
  smsCodeToCountdownSecondsAtom,
  smsProviderTypeAtom,
} from "@cs-magic/react/store/sms.atom";
import { Input } from "@cs-magic/shadcn/ui/input";
import { Label } from "@cs-magic/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@cs-magic/shadcn/ui/select";

export const ConfigSMSCard = () => {
  const [smsProvider, setSmsProvider] = useAtom(smsProviderTypeAtom);
  const [smsCountdownSeconds, setSmsCountdownSeconds] = useAtom(
    smsCodeToCountdownSecondsAtom,
  );
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
  );
};
