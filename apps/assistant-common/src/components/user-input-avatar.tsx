"use client";

import { uploadFile } from "@cs-magic/common/oss/oss.server";
import { Label } from "@cs-magic/shadcn/ui/label";

import { UserAvatar } from "./user-avatar";
import { useDraftSession } from "../hooks/use-user";

export const UserInputAvatar = () => {
  const { draft, setDraft } = useDraftSession("image");

  return (
    <Label className={"h-12 shrink-0 hover:cursor-pointer"}>
      <UserAvatar user={{ id: "", image: draft ?? "", name: "" }} />

      <input
        hidden
        type={"file"}
        accept={"image/jpeg,image/png"}
        onChange={async (event) => {
          const files = event.currentTarget.files;
          if (!files?.length) return;

          const data = await uploadFile(files[0]!);
          if (data.success) setDraft(data.data);
        }}
      />
    </Label>
  );
};
