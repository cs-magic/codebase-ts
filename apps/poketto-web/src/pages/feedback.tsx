import { zodResolver } from "@hookform/resolvers/zod";
import { IssueType } from "@prisma/client";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@cs-magic/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@cs-magic/shadcn/ui/form";
import { Input } from "@cs-magic/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@cs-magic/shadcn/ui/select";
import { Switch } from "@cs-magic/shadcn/ui/switch";
import { Textarea } from "@cs-magic/shadcn/ui/textarea";

import { RootLayout } from "@/components/layouts/root.layout";
import { feedbackFormSchema } from "@/ds";
import { trpcApi } from "@/trpc-api";
import { getZodDefaults } from "@/lib/zod";

const FeedbackForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { mutateAsync: postFeedback, isLoading } =
    trpcApi.feedback.post.useMutation();

  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: getZodDefaults(feedbackFormSchema),
  });

  async function onSubmit(values: z.infer<typeof feedbackFormSchema>) {
    console.log("submitted feedback: ", values);
    toast.success("感谢！提交成功！");
    await postFeedback(values);
    void router.push("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-4 w-full md:w-[480px] mx-auto"
      >
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>联系方式</FormLabel>
              <FormControl>
                <Input placeholder="微信/手机号/邮箱" {...field} />
              </FormControl>
              <FormDescription>
                我们会同步以您留的联系方式通知反馈
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="issueType"
          render={({ field }) => {
            console.log({ issueType: field });

            return (
              <FormItem>
                <FormLabel>类型</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(IssueType).map((cl: IssueType) => (
                        <SelectItem value={cl} key={cl}>
                          {t(`feedback:${cl}.title`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  {t(`feedback:${field.value}.desc`)}
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>标题</FormLabel>
              <FormControl>
                <Input placeholder="一句话描述您的问题" {...field} />
              </FormControl>
              <FormDescription>
                我们不是标题党，但标题真地很重要！
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>详情</FormLabel>
              <FormControl>
                <Textarea placeholder="对您问题的补充" {...field} />
              </FormControl>
              <FormDescription>
                一份具体的说明往往会有意想不到的效果哦
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="anonymous"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>是否匿名</FormLabel>
                <FormDescription>
                  匿名的话您的头像等信息将不会被显示
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          提交
        </Button>
      </form>
    </Form>
  );
};

export default function SeekPlatformWaitlistPage() {
  return (
    <RootLayout>
      <FeedbackForm />
    </RootLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "feedback"])),
    },
  };
}
