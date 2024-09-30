"use client";

import { CircleUser } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { IconContainer } from "@cs-magic/react/components/icon-container";
import { cn } from "@cs-magic/shadcn/lib/utils";

export const UserButton = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <Link href={user ? "/dashboard" : "/auth"}>
      <IconContainer size={"lg"}>
        <CircleUser className={cn(user && "text-primary-foreground")} />
      </IconContainer>
    </Link>
  );
};
