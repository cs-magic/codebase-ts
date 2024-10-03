import { ChatMessageFormatType, PromptRoleType } from "@prisma/client";
import { Message } from "ai";

import { AllMessage, AppForListView, UserForListView } from "@/ds";
import d from "@cs-magic/common/datetime";

export const packMessageWithDate = (
  messages: Message[],
  user: UserForListView,
  app: AppForListView,
) => {
  const messagesWithDate: AllMessage[] = [];
  let curDate = d(new Date(0, 0, 0));
  for (const m of messages) {
    const newDate = d(m.createdAt).startOf("date");
    if (newDate > curDate) {
      curDate = newDate;
      messagesWithDate.push({
        systemType: "date",
        content: curDate.format("MMMM DD"),
      });
    }
    messagesWithDate.push({
      ...m,
      user:
        m?.role === PromptRoleType.user
          ? {
              id: user!.id,
              image: user!.image!,
              name: user!.name!,
            }
          : {
              id: app.id,
              image: app.avatar,
              name: app.name!,
            },
      format:
        "format" in m
          ? (m.format as ChatMessageFormatType)
          : ChatMessageFormatType.text,
      createdAt: m?.createdAt ?? new Date(),
      updatedAt: m?.createdAt ?? new Date(),
    });
  }
  return messagesWithDate;
};
