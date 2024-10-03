import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";

import { ResponsiveTooltip } from "@cs-magic/react/components/containers";
import { type IMenuItem } from "@/ds";

export function SidebarNavItem({ field, Icon, link }: IMenuItem) {
  const { t } = useTranslation();

  const inner = (
    <ResponsiveTooltip
      content={t(`common:menus.${field}`)}
      className={"md:pr-2 lg:pr-4"}
      disableHoverableContent
    >
      {Icon && <Icon className="wh-12 p-btn-horizontal" />}
    </ResponsiveTooltip>
  );
  return link ? <Link href={link}>{inner}</Link> : inner;
}

export function FooterNavItem({ field, link, Icon }: IMenuItem) {
  const { t } = useTranslation();
  const content = t(`common:menus.${field}`);
  // console.log({ field, content })

  const inner = (
    <>
      {Icon && <Icon className="wh-[20px]" />}
      <span>{content}</span>
    </>
  );
  return link ? (
    <Link className="p-btn-vertical" href={link}>
      {inner}
    </Link>
  ) : (
    inner
  );
}
