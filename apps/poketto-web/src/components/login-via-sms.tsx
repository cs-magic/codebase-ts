"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@cs-magic/shadcn/ui/form";
import { Input } from "@cs-magic/shadcn/ui/input";

import { ButtonWithLoading } from "@/components/buttons";
import { SMS_PROVIDER_ID } from "@/config";
import { useLocale } from "@/hooks/use-i18n";
import { useLogIn } from "@/hooks/use-login";
import { useMustache } from "@/hooks/use-mustache";
import { useSendSms } from "@/hooks/use-send-sms";
import { SmsStep, sendSmsSchema, smsLoginSchema } from "@/schema/sms";

export default function LoginViaSms() {
  const { t } = useTranslation();
  const m = useMustache();

  const searchParams = useSearchParams();
  const locale = useLocale();

  const [step, setStep] = useState<SmsStep>(SmsStep.toSendCode);

  const schema = step === SmsStep.toSendCode ? sendSmsSchema : smsLoginSchema;
  type Schema = z.infer<typeof schema>;

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    // 如果不加default，会导致uncontrolled error
    defaultValues: {
      phone: "",
      code: "",
    },
  });

  const { send, sending } = useSendSms();
  const { loggingIn, logIn } = useLogIn();

  const submit = async (values: Schema) => {
    // send code
    if (step === SmsStep.toSendCode) {
      const { phone } = values;
      const res = await send(values);
      if (res) {
        toast.success("发送成功");
        setStep(SmsStep.toLogin);
      } else toast.error("发送失败");
      return;
    }

    // sign in
    const signInResult = await signIn(
      SMS_PROVIDER_ID,
      {
        ...values,
        redirect: false,
        callbackUrl: searchParams?.get("from") || "/dashboard",
      },
      { locale, origin },
    );
    console.log("[sms-auth]: ", { signInResult });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className={"space-y-4"}>
        <FormField
          name={"phone"}
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <Input placeholder="请输入您的手机号" {...field} />
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {step === SmsStep.toLogin && (
          <FormField
            name={"code"}
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <Input placeholder="请输入您的验证码" {...field} />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}

        <ButtonWithLoading
          loading={sending || loggingIn}
          type={"submit"}
          className={"w-full"}
        >
          {step === SmsStep.toSendCode ? "发送验证码" : "登录"}
        </ButtonWithLoading>
      </form>
    </Form>
  );
}
