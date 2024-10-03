import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { buttonVariants } from "@cs-magic/shadcn/ui/button";
import { Input } from "@cs-magic/shadcn/ui/input";
import { Label } from "@cs-magic/shadcn/ui/label";

import { SpinnerIcon } from "@/components/icons";
import { useLocale } from "@/hooks/use-i18n";
import { useLogIn } from "@/hooks/use-login";
import { useMustache } from "@/hooks/use-mustache";
import { cn } from "@/lib/utils";

const emailAuthSchema = z.object({
  email: z.string().email(),
});
type IEmailAuth = z.infer<typeof emailAuthSchema>;

export default function LoginViaEmail() {
  const { t } = useTranslation();
  const m = useMustache();
  const { loggingIn, logIn } = useLogIn();

  const searchParams = useSearchParams();
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmailAuth>({
    resolver: zodResolver(emailAuthSchema),
  });

  const logInViaEmail = async (values: IEmailAuth) => {
    const { email } = values;
    await logIn(async () => {
      // const signInResult = false
      const signInResult = await signIn(
        "email",
        {
          email,
          redirect: false,
          callbackUrl: searchParams?.get("from") || "/dashboard",
        },
        { locale, origin },
      );
      console.log({ signInResult });
      // 无论成功与否，signInResult.ok始终为true，.status始终为200，所以要用error捕捉（但又没传回来具体的message）
      if (signInResult?.error) {
        // e.g. EmailSignIn
        toast.error(`邮箱登录失败，请查询后端报错`);
      } else {
        toast.success(m(t("auth:MailSent"), { email }));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(logInViaEmail)}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={loggingIn}
            {...register("email")}
            // defaultValue={baseEnv.NODE_ENV === "development" ? "mark@cs-magic.com" : undefined}
          />
          {errors?.email && (
            <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={cn(buttonVariants())}
          disabled={loggingIn}
        >
          {loggingIn && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
          {t("auth:SignInWithEmail")}
        </button>
      </div>
    </form>
  );
}
