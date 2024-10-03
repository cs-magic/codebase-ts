"use client";

import { trpcApi } from "@/trpc-api";
import { useState } from "react";
import { ISendSms } from "@/schema/sms";

export const useSendSms = () => {
  const [sending, setSending] = useState(false);

  const sendSms = trpcApi.auth.sendSms.useMutation();

  const send = async (data: ISendSms) => {
    setSending(true);
    const { phone } = data;
    const result = await sendSms.mutateAsync({ phone });
    setSending(false);
    return result;
  };

  return { sending, send };
};
