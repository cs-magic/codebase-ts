"use client";

import { useAtom, useSetAtom } from "jotai";
import { EditIcon } from "lucide-react";

import { smsStageAtom, userPhoneAtom } from "@cs-magic/react/store/sms.atom";

export const SmsReInputPhone = () => {
  const [phone] = useAtom(userPhoneAtom);

  const setStage = useSetAtom(smsStageAtom);

  return (
    <div className={"inline-flex items-center gap-1 font-semibold"}>
      {phone}
      <EditIcon
        className={"h-4 w-4 cursor-pointer"}
        onClick={() => {
          setStage("toSendSms");
        }}
      />
    </div>
  );
};
