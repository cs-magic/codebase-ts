import capitalize from "lodash/capitalize";
import startCase from "lodash/startCase";
import Image from "next/image";

import { AspectRatio } from "@cs-magic/shadcn/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@cs-magic/shadcn/ui/avatar";
import { Badge } from "@cs-magic/shadcn/ui/badge";

import { UsesField, ViewsField } from "@/components/field";
import {
  type AppForListView,
  CardsLayoutType,
  IMAGE_SIZE,
  type SortOrder,
} from "@/ds";
import clsx from "@/lib/clsx";
import { getImageUri } from "@/lib/string";

export const AppVerticalCardView = ({
  app,
  cardsLayout,
  sort,
  size = "md",
}: {
  app: AppForListView;
  cardsLayout: CardsLayoutType;
  sort: SortOrder;
  size?: IMAGE_SIZE;
}) => {
  // console.log("app avatar: ", app.avatar)
  const appAvatar = getImageUri(app.avatar, size);
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl text-white">
      {cardsLayout === CardsLayoutType.grid ? (
        <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-2xl">
          <Image
            src={appAvatar}
            priority
            fill
            className="object-fill transition-all group-hover:scale-125"
            alt={app.name}
            sizes="300px"
          />
        </AspectRatio>
      ) : (
        <Image
          src={appAvatar}
          priority
          width={300}
          height={400}
          className="object-fill transition-all group-hover:scale-125"
          alt={app.name}
          style={{ width: "100%", height: "auto" }}
          onError={(error) => {
            console.log({ error });
          }}
        />
      )}

      {/* header desc */}
      <div className="| absolute top-0 flex w-full justify-between p-4">
        <div className="flex items-center gap-2">
          {app.tags.length && (
            <Badge variant="destructive">
              {startCase(capitalize(app.tags[0]?.name))}
            </Badge>
          )}
        </div>
        {/*<AppDetailContainer appId={app.id}>*/}
        {/*  <DotsVerticalIcon className="hidden group-hover:flex" />*/}
        {/*</AppDetailContainer>*/}
      </div>

      {/* footer desc */}
      <div
        className={clsx(
          "| absolute bottom-0 flex w-full flex-col gap-2 p-4",
          "backdrop-blur",
          "backdrop-brightness-[.75] dark:backdrop-brightness-50 ",
        )}
      >
        {/* title */}
        <div className="truncate text-lg font-normal">{app.name}</div>

        <div className="text-md hidden transition-all group-hover:line-clamp-3">
          {app.desc}
        </div>

        {/*	user - ranks */}
        <div className="| flex justify-between text-xs text-slate-100  dark:text-primary-foreground/75 ">
          {/* user */}
          <div className="| flex w-1/2 items-center gap-2">
            <Avatar className="wh-5">
              <AvatarImage src={getImageUri(app.avatar, "md")} />
            </Avatar>
            <span className="truncate italic font-normal">{app.name}</span>
          </div>

          {/* ranks */}
          <div className="flex items-center gap-1">
            <UsesField value={app.state?.calls ?? 0} />
            <ViewsField value={app.state?.views ?? 0} />
          </div>
        </div>
      </div>
    </div>
  );
};
