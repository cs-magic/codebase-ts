"use client"
import { z } from "zod"
import { PHONE_REGEX } from "@/config/const"
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SeparatorContainer } from "@/components/containers"

const sendSmsSchema = z.object({
  phone: z.string().refine((s) => PHONE_REGEX.test(s), "手机号格式不合法"),
})
const smsSignInSchema = sendSmsSchema.and(
  z.object({
    code: z.string().refine((s) => /\d{6}/.test(s), "验证码格式不合法"),
  }),
)

export default function AuthPage() {
  const {
    phone,
    setPhone,
    stage,
    setStage,
    code,
    codeDowntime,
    setCode,
    sendSms,
  } = useSmsStore()

  const formSchema = stage === "toSendSms" ? sendSmsSchema : smsSignInSchema
  type IForm = z.infer<typeof formSchema>
  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
  })

  const submit = (values: IForm) => {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className={
          "h-full w-[320px] mx-auto flex flex-col justify-center items-center gap-4"
        }
      >
        <Label className={"text-semibold text-lg"}>登录魔法社</Label>
        <Label className={"text-muted-foreground text-xs"}>
          欢迎回来！请登录以开启魔法世界！
        </Label>

        <Button size={"sm"} className={"w-full"}>
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
                <Input {...field} placeholder={""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {stage === "toAuth" && (
          <FormField
            name={"code"}
            render={({ field }) => (
              <FormItem className={"w-full"}>
                <Input {...field} placeholder={"请输入验证码"} />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type={"submit"} className={"w-full"}>
          {stage === "toSendSms" ? "发送验证码" : "登录"}
        </Button>

        <Separator orientation={"horizontal"} className={"mt-8"} />

        <div className={"text-xs text-muted-foreground"}>
          由<span className={"font-semibold mx-1"}>魔法社</span>提供安全支持
        </div>
      </form>
    </Form>
  )
}
