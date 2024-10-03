import { useUserInDb } from "@/hooks/use-user-in-db";
import { ChargeContainer } from "@cs-magic/common/stripe/components/charge-container";
import { AvatarIcon } from "@radix-ui/react-icons";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@cs-magic/shadcn/ui/avatar";
import { Badge } from "@cs-magic/shadcn/ui/badge";
import { Button } from "@cs-magic/shadcn/ui/button";
import { Separator } from "@cs-magic/shadcn/ui/separator";

import { DEFAULT_USER_NAME } from "@/config";
import { type UserForProfile } from "@/ds";
import { getFlowgptUserLink, getImageUri } from "@/lib/string";

export function UserProfile({ user }: { user: UserForProfile }) {
  const { t } = useTranslation();
  const { userId } = useUserInDb();
  const isSelf = userId === user.id;

  return (
    <div className="| mx-auto flex h-fit max-w-[375px] flex-col justify-around gap-4 rounded-2xl p-4">
      <Avatar className="mx-auto wh-[128px]">
        <AvatarImage
          src={getImageUri(user?.image ?? user.id, "md")}
          className=""
        />
        <AvatarFallback>
          <AvatarIcon />
        </AvatarFallback>
      </Avatar>

      {/* avatar info */}
      <div className="flex flex-col  overflow-hidden">
        {user.platformType === "FlowGPT" ? (
          <Link
            className="flex items-center gap-2"
            href={getFlowgptUserLink(user.platformArgs?.uri)}
            target="_blank"
          >
            <span className={"text-2xl"}>
              {user?.name ??
                user?.email ??
                user.platformArgs?.uri ??
                DEFAULT_USER_NAME}
            </span>
            <Badge className="text-xs" variant="secondary">
              {user.platformType}
            </Badge>
          </Link>
        ) : (
          <span className={"text-2xl "}>
            {user?.name ??
              user?.email ??
              user.platformArgs?.uri ??
              DEFAULT_USER_NAME}
          </span>
        )}
        <p className="truncate text-muted-foreground">@{userId}</p>
        {/* todo: description */}
        {/*{isSelf && (*/}
        {/*  <p className="lines-clamp-2 my-2 text-primary-foreground/75">*/}
        {/*    {user?.description ?? "You haven't said anything about yourself ~"}*/}
        {/*  </p>*/}
        {/*)}*/}
      </div>

      {/*	stat */}
      <div className="flex items-center justify-around gap-2">
        <Button
          disabled={!user}
          className="flex h-fit grow flex-col items-center gap-2 p-2"
          variant="ghost"
        >
          <span>{t("common:Following")}</span>
          <span>{user?.followingCount}</span>
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <Button
          disabled={!user}
          className="flex h-fit grow  flex-col items-center gap-2 p-2"
          variant="ghost"
        >
          <span>{t("common:Followers")}</span>
          <span>{user?.followedByCount}</span>
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <Button
          disabled={!user}
          className="flex h-fit grow  flex-col items-center gap-2 p-2"
          variant="ghost"
        >
          <span>{t("common:Impact")}</span>
          <span>{(user?.followedByCount ?? 0) * 1000}</span>
        </Button>
      </div>

      {/*	collections */}
      {isSelf && (
        <div className={"flex flex-col gap-2"}>
          <div className="flex p-flex-equal gap-4">
            {/* todo: edit profile */}
            {/*<Button variant="outline" disabled={!user} className={"w-full"}>*/}
            {/*  {t("common:EditProfile")}*/}
            {/*</Button>*/}

            <Button
              disabled={!user}
              className="flex items-center gap-2 p-2"
              variant="ghost"
            >
              <span>{t("common:Dora")}: </span>
              <span>{user?.balance ?? 0}</span>
            </Button>

            <ChargeContainer asChild>
              <Button variant="outline" disabled={!user} className={"w-full"}>
                {t("common:Charge")}
              </Button>
            </ChargeContainer>

            {/* <Button disabled={!user}>收藏</Button> */}
          </div>
        </div>
      )}
    </div>
  );
}
