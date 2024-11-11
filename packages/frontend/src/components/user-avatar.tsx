import { VerticalAspectRatio } from "@/components/aspect-ratio";
import { IUserSummary } from "@cs-magic/common/schema/user.summary";
import { upgradeUrl } from "@cs-magic/common/utils/upgrade-url";
import { cn } from "@cs-magic/shadcn/lib/utils";
import { Avatar, AvatarFallback } from "@cs-magic/shadcn/ui/avatar";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { omit } from "lodash-es";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { ComponentPropsWithoutRef, HTMLAttributes } from "react";

export const UserAvatar = ({
  user,
  withName,
  className,
  imageProps,
  avatarProps,
  ...props
}: {
  user: IUserSummary | null;
  withName?: boolean;
} & HTMLAttributes<HTMLDivElement> & {
    imageProps?: ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;
    avatarProps?: ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;
  }) => {
  const avatarUrl =
    imageProps?.src ?? upgradeUrl(user?.image ?? user?.avatar ?? "");

  return (
    <div className={cn("flex h-full items-center gap-2", className)} {...props}>
      <VerticalAspectRatio ratio={1}>
        <Avatar
          className={cn("h-full w-full border-none ", avatarProps?.className)}
          {...omit(avatarProps, ["className"])}
        >
          {/*<AvatarImage*/}
          {/*  src={*/}
          {/*    imageProps?.src ?? upgradeUrl(user?.image ?? user?.avatar ?? "")*/}
          {/*  }*/}
          {/*  {...omit(imageProps, ["src"])}*/}
          {/*/>*/}

          {avatarUrl && (
            <Image
              alt={"user-avatar"}
              width={120}
              height={120}
              className={"rounded-full "}
              src={avatarUrl}
              {...omit(imageProps, ["src", "width", "height"])}
            />
          )}

          <AvatarFallback>
            {user?.name?.length ? (
              <div
                className={
                  "h-full w-full bg-gray-50 border-none flex items-center justify-center text-xl"
                }
              >
                {user.name.slice(0, 2).toUpperCase()}
              </div>
            ) : (
              <UserIcon className={"h-full w-full bg-gray-50 border-none"} />
            )}
          </AvatarFallback>
        </Avatar>
      </VerticalAspectRatio>

      {withName && (
        <span className={"overflow-ellipsis text-ellipsis"}>{user?.name}</span>
      )}
    </div>
  );
};
