"use client"

import { useSmsStore } from "@/store/sms.slice"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from "@/components/ui/button"
import { SeparatorContainer } from "@/components/containers"
import { Input } from "@/components/ui/input"
import { ISendSms, sendSmsSchema } from "@/schema/sms"
import { ButtonWithLoading } from "@/components/buttons"
import Link from "next/link"
import { getWechatAuthorizationUrl } from "@/server/wechat/auth/funcs/client"
import { cn } from "@/lib/utils"
import { useBrowserEnvironment } from "@/hooks/use-browser-environment"

export const SmsSendCode = () => {
  const { downtime, sendCode } = useSmsStore()

  const form = useForm<ISendSms>({
    resolver: zodResolver(sendSmsSchema),
    // 如果不加的话，会导致 undefined --> value warning
    defaultValues: {
      phone: "17766091857",
    },
  })

  const { isWechat } = useBrowserEnvironment()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(sendCode)}
        className={"flex flex-col gap-4 w-full items-center"}
      >
        <Label className={"text-semibold text-lg"}>登录魔法社</Label>
        <Label className={"text-muted-foreground text-xs"}>
          欢迎回来！请登录以开启魔法世界！
        </Label>

        {isWechat && (
          <>
            <Link
              href={getWechatAuthorizationUrl()}
              className={cn(
                buttonVariants({ size: "sm" }),
                "w-full bg-wechat text-white hover:bg-wechat/50",
              )}
            >
              微信登录
            </Link>

            <SeparatorContainer>或者</SeparatorContainer>
          </>
        )}

        <FormField
          name={"phone"}
          control={form.control}
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormLabel>请输入手机号</FormLabel>
              <FormControl>
                <Input {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonWithLoading
          type={"submit"}
          className={"w-full"}
          downtime={downtime}
        >
          发送验证码
        </ButtonWithLoading>
      </form>
    </Form>
  )
}
