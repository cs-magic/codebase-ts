import { useSmsStore } from "@/store/sms"
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
import { Button } from "@/components/ui/button"
import { SeparatorContainer } from "@/components/containers"
import { Input } from "@/components/ui/input"
import { ButtonWithLoading } from "@/components/buttons"
import { ISendSms, sendSmsSchema } from "@/schema/sms"

export const SmsSend = () => {
  const { downtime, sendCode, sendingCode } = useSmsStore()

  const form = useForm<ISendSms>({
    resolver: zodResolver(sendSmsSchema),
    // 如果不加的话，会导致 undefined --> value warning
    defaultValues: {
      phone: "17766091857",
    },
  })

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

        <Button
          size={"sm"}
          className={"w-full bg-wechat text-white hover:bg-wechat/50"}
        >
          微信登录
        </Button>

        <SeparatorContainer>或者</SeparatorContainer>

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
          loading={sendingCode}
          downtime={downtime}
        >
          发送验证码
        </ButtonWithLoading>
      </form>
    </Form>
  )
}
