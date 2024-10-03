import d from "@cs-magic/common/datetime";
import { Avatar, AvatarImage } from "@cs-magic/shadcn/ui/avatar";
import { Skeleton } from "@cs-magic/shadcn/ui/skeleton";

import { UsesField, ViewsField } from "@/components/field";
import { type AppForListView } from "@/ds";
import { getImageUri } from "@/lib/string";

export function AppHorizontalCardView({
  app,
}: {
  app: AppForListView | undefined;
}) {
  if (!app) {
    return (
      <div className="| flex w-full gap-8 pb-3 pt-6 text-muted-foreground">
        <Skeleton className="wh-12" />
        <div className="flex grow flex-col gap-2">
          <Skeleton className="h-4" />
          <Skeleton className="h-8" />
          <Skeleton className="h-4" />
        </div>

        <div className="inline-flex shrink-0 gap-2">
          <Skeleton className="h-8 w-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full cursor-pointer items-center gap-8 overflow-hidden p-3 pt-6 text-muted-foreground hocus:bg-accent">
      <Avatar className="rounded-sm wh-[64px]">
        <AvatarImage src={getImageUri(app.avatar, "md")} />
      </Avatar>

      <div className="flex grow flex-col items-start gap-2 overflow-hidden">
        <p className="truncate font-semibold text-primary-foreground">
          {app.name}
        </p>
        <p className="line-clamp-2 text-primary-foreground/75">{app.desc}</p>

        <div className="inline-flex w-full justify-between gap-4 overflow-hidden">
          <p className="truncate">By {app.name}</p>
          <p className=" truncate " style={{ direction: "rtl" }}>
            Updated on {d(app.updatedAt).format("DD MMM, YYYY")}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-2 md:flex-row">
        <ViewsField value={app.state?.views ?? 0} />
        <UsesField value={app.state?.calls ?? 0} />
        {/* <SavesField value={app.state?.stars ?? 0} /> */}
      </div>
    </div>
  );
}
