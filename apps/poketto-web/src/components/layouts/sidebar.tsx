import { useUserInDb } from "@/hooks/use-user-in-db";
import { trpcApi } from "@/trpc-api";
import { InvitationStatus } from "@prisma/client";
import { BellIcon, Cross1Icon } from "@radix-ui/react-icons";
import { UserIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@cs-magic/shadcn/ui/avatar";
import { Badge } from "@cs-magic/shadcn/ui/badge";
import { Button } from "@cs-magic/shadcn/ui/button";
import { Separator } from "@cs-magic/shadcn/ui/separator";

import { IconContainer } from "@cs-magic/react/components/containers";
import { MenuItems } from "@/components/icons";
import { SidebarNavItem } from "@/components/link";
import {
  ICON_DIMENSION_MD,
  ICON_DIMENSION_SM,
  URI,
  sidebarSections,
  siteConfig,
} from "@/config";
import clsx from "@/lib/clsx";

export function Sidebar() {
  const { t } = useTranslation();
  const { user, userId } = useUserInDb();

  return (
    <div
      className={clsx(
        "shrink-0 h-full overflow-auto pt-8 p-2 gap-6 | hidden md:flex flex-col items-center | whitespace-nowrap bg-sidebar text-sm text-primary-foreground",
      )}
    >
      {Object.entries(sidebarSections).map(([key, keys]) => (
        <Fragment key={key}>
          <Separator className={"first:hidden"} />
          <section className="w-full flex flex-col">
            {keys.map((key) => (
              <SidebarNavItem
                key={key}
                {...MenuItems.find((i) => i.field === key)!}
              />
            ))}
          </section>
        </Fragment>
      ))}

      {/* footer */}
      <div className="grow" />

      {/*{user && <InviteCard />}*/}

      {user ? (
        <Link
          href={URI.user.mySpace}
          className="flex items-center justify-center gap-2 border-t py-4"
        >
          <Avatar className={ICON_DIMENSION_MD}>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>

          <div className="hidden lg:flex grow flex-col gap-0 overflow-hidden">
            <span className="text-xs">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground italic">
              @{userId}
            </span>
          </div>
          <IconContainer className="hidden lg:flex shrink-0">
            <BellIcon />
          </IconContainer>
          {/*<ChevronRightIcon className="hidden lg:flex shrink-0" />*/}
        </Link>
      ) : (
        <div className={"w-full p-2 flex justify-center"}>
          <Button
            variant="destructive"
            className="w-full hidden lg:block"
            onClick={() => void signIn()}
          >
            {t("common:Login")}
          </Button>
          <Avatar className={"block lg:hidden"} onClick={() => void signIn()}>
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}

export function InviteCard() {
  const { data = [] } = trpcApi.invitation.list.useQuery();
  // todo: include ? on enum type
  const surplus = data.filter(
    (item) => item.status === InvitationStatus.Idle,
  ).length;

  return (
    <div className="hidden lg:flex flex-col gap-2 whitespace-normal rounded-xl border p-4 text-sm">
      <div className="flex items-center justify-between">
        <Badge className="w-fit" variant="secondary">
          Tips
        </Badge>
        <Cross1Icon
          className={clsx("text-muted-foreground", ICON_DIMENSION_SM)}
        />
      </div>
      <article className="p-prose">
        <ReactMarkdown>
          {`每位 ${siteConfig.name} 用户都拥有 **5** 张邀请码，分享给您的好友注册成功后将有优惠券赠送哦！当前剩余：[${surplus}](/dashboard)`}
        </ReactMarkdown>
      </article>
      <Button className="bg-blue-500/75 hover:bg-blue-500">立即邀请</Button>
    </div>
  );
}
