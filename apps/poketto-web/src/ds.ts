import { IssueType, Prisma } from "@prisma/client";
import { Crosshair2Icon, CubeIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { type IconProps } from "@radix-ui/react-icons/dist/types";
import { CreateMessage } from "ai";
import type { NextComponentType, NextPage, NextPageContext } from "next";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";
import {
  ElementType,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
} from "react";
import { z } from "zod";

import { FREE_GPT3_DAILY_USER, FREE_GPT4_DAILY_USER, MenuKey } from "@/config";

import AppGetPayload = Prisma.PokettoAppGetPayload;
import AppSelect = Prisma.PokettoAppSelect;
import ChatMessageGetPayload = Prisma.ChatMessageGetPayload;
import ChatMessageSelect = Prisma.ChatMessageSelect;
import ConversationGetPayload = Prisma.ConversationGetPayload;
import ConversationInclude = Prisma.ConversationInclude;
import ConversationSelect = Prisma.ConversationSelect;

import UserGetPayload = Prisma.UserGetPayload;
import UserSelect = Prisma.UserSelect;
import validator = Prisma.validator;

// -----------------------------------------------------------------------------
// models
// -----------------------------------------------------------------------------

export const selectUserForListView = validator<UserSelect>()({
  id: true,
  name: true,
  image: true,
});
export type UserForListView = UserGetPayload<{
  select: typeof selectUserForListView;
}>;

export const selectUserProfile = validator<UserSelect>()({
  ...selectUserForListView,
  description: true,
  followingCount: true,
  followedByCount: true,
  balance: true,
  email: true,
  platformType: true,
  platformId: true,
  platformArgs: true,
  quota: true,
});
export type UserForProfile = UserGetPayload<{
  select: typeof selectUserProfile;
}>;

export const selectAppForListView = validator<AppSelect>()({
  id: true,
  createdAt: true,
  updatedAt: true,
  version: true,
  platformId: true,
  platformType: true,
  avatar: true,
  name: true,
  desc: true,
  creatorId: true,
  tags: true,
  state: true,
  modelName: true,
  language: true,
  isOpenSource: true,
  category: true,
  creator: {
    select: {
      id: true,
      name: true,
      platformType: true,
      platformId: true,
      platformArgs: true,
    },
  },
});
export type AppForListView = AppGetPayload<{
  select: typeof selectAppForListView;
}>;

export const selectChatMessageForListView = validator<ChatMessageSelect>()({
  id: true,
  createdAt: true,
  updatedAt: true, // todo: support message modification
  content: true,
  role: true,
  format: true,
  user: {
    select: selectUserForListView,
  },
});
export type SelectChatMessageForListView = ChatMessageGetPayload<{
  select: typeof selectChatMessageForListView;
}>;

export const selectConvForListView = validator<ConversationSelect>()({
  // @ts-ignore
  // latestMessage: true, // 这会覆盖我的 messages 数据结构，因为 latestMessages need messages
  messages: {
    orderBy: { id: "desc" },
    take: 1,
    select: selectChatMessageForListView,
  },
  pinned: true,
  userId: true,
  appId: true,
  app: {
    select: selectAppForListView,
  },
});

export type ConvForListView = ConversationGetPayload<{
  select: typeof selectConvForListView;
}>;

export const selectAppForDetailView = validator<AppSelect>()({
  ...selectAppForListView,
  comments: true,
  prompts: {
    select: {
      content: true,
      role: true,
    },
  },
  temperature: true,
});
export type AppForDetailView = AppGetPayload<{
  select: typeof selectAppForDetailView;
}>;

export const selectChatMessageForDetailView = validator<ChatMessageSelect>()({
  ...selectChatMessageForListView,
  cost: true,
  conversation: {
    select: selectConvForListView,
  },
});
export type SelectChatMessageForDetailView = ChatMessageGetPayload<{
  select: typeof selectChatMessageForDetailView;
}>;

export const includeConvForDetailView = validator<ConversationInclude>()({
  app: { select: selectAppForDetailView },
  messages: {
    include: {
      user: true, // 获取每条信息的用户
    },
  },
});
export type ConvForDetailView = ConversationGetPayload<{
  include: typeof includeConvForDetailView;
}>;

// -----------------------------------------------------------------------------
// next-auth, ref: https://stackoverflow.com/a/69968164/9422455
// -----------------------------------------------------------------------------

export type NextPageWithAuth<P = any, IP = P> = NextPage<P, IP> & {
  auth?: boolean;
};

export type NextComponentWithAuth = NextComponentType<
  NextPageContext,
  any,
  any
> &
  Partial<NextPageWithAuth>;

export type ExtendedAppProps<P = { session: Session }> = AppProps<P> & {
  Component: NextComponentWithAuth;
};

// -----------------------------------------------------------------------------
// general
// -----------------------------------------------------------------------------

export interface IMenuItem {
  field: MenuKey;
  link: string;
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

export enum CommandType {
  suggestion = "suggestion",
  settings = "settings",
}

export interface ICommandItem {
  id: string;
  Icon: (props: any) => ReactNode;
  title?: string;
  category: CommandType;
  kbd?: string;
}

export const modelTypes = ["gpt-3.5-turbo", "gpt-4", "openchat"] as const;
export type ModelType = (typeof modelTypes)[number];
export const defaultModelQuota: Record<ModelType, number> = {
  "gpt-3.5-turbo": FREE_GPT3_DAILY_USER,
  "gpt-4": FREE_GPT4_DAILY_USER,
  openchat: 100,
};

export type IMAGE_SIZE = "xs" | "md" | "raw" | "full";

export enum CardsLayoutType {
  masonry = "masonry",
  grid = "grid",
}

export const sortOrders = ["mostViewed", "mostUsed", "newest"] as const;
// todo: more intelligent approach
// export type SortOrder = keyof typeof resources.common.sorts
export type SortOrder = (typeof sortOrders)[number];

export const Order2icon: { [key in SortOrder]: ElementType } = {
  mostViewed: EyeOpenIcon,
  mostUsed: CubeIcon,
  // mostSaved: IconDownload,
  // mostShared: IconTrendingUp,
  newest: Crosshair2Icon,

  // recommend: IconStackPush,
  // top: IconThumbUp,
  // mostViewed: IconEye,
  // "most-saved": IconDownload,
  // trending: IconTrendingUp,
  // follow: IconTelescope,
};

export type AllMessage =
  | SelectChatMessageForListView
  | {
      systemType: "notification" | "date";
      content: string;
    };

export const appPlatforms = [
  "web",
  "desktop",
  "mobile",
  "mini-program",
] as const;
export type AppPlatform = (typeof appPlatforms)[number];

export const feedbackFormSchema = z.object({
  // appPlatform: z.enum(appPlatforms).default("web"),
  contact: z.string().min(1),
  issueType: z.nativeEnum(IssueType).default("Debunk"),
  title: z.string().min(1),
  detail: z.string().min(1),
  anonymous: z.boolean().default(false),
});

export const memoryModes = ["one-time", "recent", "with-memory"] as const;
export type MemoryMode = (typeof memoryModes)[number];

export type OpenAIMessage = CreateMessage;
