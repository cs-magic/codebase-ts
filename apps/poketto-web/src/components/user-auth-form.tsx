"use client";

import { getOrigin } from "@cs-magic/common/router";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import * as React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@cs-magic/shadcn/ui/tabs";

import { IconContainer } from "@cs-magic/react/components/containers";
import { GithubIcon } from "@/components/icons";
import LoginViaEmail from "@/components/login-via-email";
import LoginViaSms from "@/components/login-via-sms";
import { cn } from "@/lib/utils";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export enum LoginType {
  email = "email",
  sms = "sms",
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Tabs defaultValue={LoginType.sms}>
        <TabsList className={"bg-transparent gap-4"}>
          <TabsTrigger
            className={
              "bg-transparent data-[state=active]:border-b border-primary rounded-none"
            }
            value={LoginType.sms}
          >
            短信登录
          </TabsTrigger>
          <TabsTrigger
            className={
              "bg-transparent data-[state=active]:border-b border-primary rounded-none"
            }
            value={LoginType.email}
          >
            邮箱登录
          </TabsTrigger>
        </TabsList>

        <TabsContent value={LoginType.sms}>
          <LoginViaSms />
        </TabsContent>

        <TabsContent value={LoginType.email}>
          <LoginViaEmail />
        </TabsContent>
      </Tabs>

      {/* 国内的OAuth会超过3.5秒 */}
      {!getOrigin().includes("cn") && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t("common:OrContinueWith")}
              </span>
            </div>
          </div>

          <div className={"inline-flex items-center justify-center gap-2"}>
            <IconContainer
              className={"text-foreground/75"}
              onClick={() => {
                void signIn("github");
              }}
            >
              <GithubIcon className="h-4 w-4" />
            </IconContainer>

            <IconContainer
              className={"text-foreground/75"}
              onClick={() => {
                void signIn("discord");
              }}
            >
              <DiscordLogoIcon className="h-4 w-4 " />
            </IconContainer>
          </div>
        </>
      )}
    </div>
  );
}
