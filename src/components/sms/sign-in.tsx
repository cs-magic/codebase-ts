import { useSmsStore } from "@/store/sms"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SeparatorContainer } from "@/components/containers"
import { Input } from "@/components/ui/input"
import { ISmsSignIn, smsSignInSchema } from "@/schema/sms"

export const SmsSignIn = () => {
  const {} = useSmsStore()

  const form = useForm<ISmsSignIn>({
    resolver: zodResolver(smsSignInSchema),
  })

  const submit = (values: ISmsSignIn) => {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
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
          name={"code"}
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <Input {...field} placeholder={"请输入验证码"} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type={"submit"} className={"w-full"}>
          登录
        </Button>
      </form>
    </Form>
  )
}
