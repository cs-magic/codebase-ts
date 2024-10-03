import { Avatar, AvatarImage } from "@cs-magic/shadcn/ui/avatar";

import { ViewsField } from "@/components/field";
import { type AppForListView } from "@/ds";
import { getImageUri } from "@/lib/string";

export function SearchResultView({ app }: { app: AppForListView }) {
  return (
    <div className="flex w-full items-center gap-2 p-2 hover:bg-accent">
      <Avatar className="shrink-0">
        <AvatarImage src={getImageUri(app.avatar, "md")} />
      </Avatar>
      <div className="| flex grow flex-col gap-1 overflow-hidden">
        <p className="| truncate text-sm font-semibold text-primary-foreground/75">
          {app.name}
        </p>
        <p className="| truncate ">{app.desc}</p>
      </div>
      <div className="| flex w-20 shrink-0 flex-col gap-1 overflow-hidden whitespace-nowrap">
        <ViewsField value={app.state?.views ?? 0} />
        <p className="truncate">@{app.creator.name}</p>
      </div>
    </div>
  );
}
