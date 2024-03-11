"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom, useSetAtom } from "jotai"
import { signIn } from "next-auth/react"
import { ComponentType } from "react"
import { useForm } from "react-hook-form"
import { useEnvironments } from "../../packages/common-hooks/use-environments"
import { useSmsSendCode } from "../../packages/common-sms/hooks/use-sms-send-code"
import { ISendSms, sendSmsSchema } from "../../packages/common-sms/schema"
import {
  smsCodeCurCountdownSecondsAtom,
  userPhoneAtom,
} from "../../packages/common-sms/store"

import { ButtonWithLoading } from "../../packages/common-ui/components/button-with-loading"
import { SeparatorContainer } from "../../packages/common-ui/components/separator-container"
import { Button } from "../../packages/common-ui/shadcn/shadcn-components/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../packages/common-ui/shadcn/shadcn-components/form"
import { Input } from "../../packages/common-ui/shadcn/shadcn-components/input"
import { Label } from "../../packages/common-ui/shadcn/shadcn-components/label"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { WECHAT_PROVIDER_ID } from "../../packages/common-wechat/auth/config"

export const SmsStage1SendCode = ({
  BrandComp,
}: {
  BrandComp: ComponentType
}) => {
  const { isWechat } = useEnvironments()
  const [downtime] = useAtom(smsCodeCurCountdownSecondsAtom)

  const setPhone = useSetAtom(userPhoneAtom)

  const sendCode = useSmsSendCode()

  const form = useForm<ISendSms>({
    resolver: zodResolver(sendSmsSchema),
    // 如果不加的话，会导致 undefined --> value warning
    defaultValues: {
      phone: "",
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(sendCode)}
        className={"flex flex-col gap-4 w-full items-center"}
      >
        <div className={"text-semibold text-lg flex items-center gap-1"}>
          <span className={"shrink-0"}>登录</span>
          <BrandComp />
        </div>
        <Label className={"text-muted-foreground text-xs"}>
          欢迎回来！请登录以开启 <span className={"primary-gradient"}>A I</span>{" "}
          世界！
        </Label>

        {isWechat && (
          <>
            <Button
              size={"sm"}
              className={cn("w-full bg-wechat text-white hover:bg-wechat/50")}
              onClick={(event) => {
                event.preventDefault()
                void signIn(WECHAT_PROVIDER_ID, { callbackUrl: "/" })
              }}
            >
              微信登录
            </Button>

            <SeparatorContainer>或者</SeparatorContainer>
          </>
        )}

        <FormField
          name={"phone"}
          control={form.control}
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormLabel>请输入阁下的手机号</FormLabel>
              <FormControl>
                <Input
                  // 不要加自动聚焦，因为不止一种登录方式
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    setPhone(event.currentTarget.value)
                  }}
                />
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
