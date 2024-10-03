"use client";

import { useIntersection } from "@mantine/hooks";
import { FrameIcon } from "@radix-ui/react-icons";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

import { AspectRatio } from "@cs-magic/shadcn/ui/aspect-ratio";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@cs-magic/shadcn/ui/select";
import { Separator } from "@cs-magic/shadcn/ui/separator";

import { AppVerticalCardView } from "@/components/app/card-vertical.view";
import { AppDetailContainer } from "@/components/app/container";
import {
  GridContainer,
  IconContainer,
  MasonryContainer,
  ResponsiveTooltip,
} from "@cs-magic/react/components/containers";
import { RootLayout } from "@/components/layouts/root.layout";
import { CAROUSELS } from "@/config";
import type { SortOrder } from "@/ds";
import { CardsLayoutType, Order2icon, sortOrders } from "@/ds";
import { trpcApi } from "@/trpc-api";
import clsx from "@/lib/clsx";
import { useAppStore } from "@/store";

export default function ExplorePage() {
  const { t, i18n } = useTranslation();
  const [sortOrder, setSortOrder] = useState<SortOrder>("mostViewed");
  const [language, setLanguage] = useState<string>(i18n.language);
  const { cardsLayout } = useAppStore();
  const Container =
    cardsLayout === CardsLayoutType.grid ? GridContainer : MasonryContainer;

  const query = trpcApi.app.list.useInfiniteQuery(
    {
      sortOrder,
      language:
        language === "all" ? undefined : language === "zh-CN" ? "zh" : language,
    },
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
    },
  );
  const apps = query.data?.pages.flatMap((item) => item.items) ?? [];

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <RootLayout>
      {/* main (content - load more) */}
      <div
        className={clsx(
          "flex h-full w-full max-w-[1360px] flex-col gap-4 overflow-hidden p-4 lg:p-8",
        )}
      >
        {/* <HomeCarousel/> */}
        {/* title */}
        <div className=" w-full px-2 | flex items-center gap-2 | whitespace-nowrap">
          <FrameIcon />
          <span>{t("explore:appMarket")}</span>
          <Select onValueChange={setLanguage} value={language}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="语言" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className={"flex flex-col gap-2 py-2"}>
                <SelectItem value="all">全部语言</SelectItem>
                <Separator />
                <SelectItem value="zh-CN">中文</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="grow" />

          <div className="flex items-center gap-2">
            {sortOrders.map((order) => {
              const Icon = Order2icon[order];
              return (
                <Fragment key={order}>
                  <Separator
                    orientation="vertical"
                    className="h-4 first:hidden"
                  />

                  <IconContainer
                    className={clsx(sortOrder === order && "text-primary")}
                  >
                    <ResponsiveTooltip
                      content={t(`common:sorts.${order}`)}
                      onClick={() => {
                        setSortOrder(order as SortOrder);
                      }}
                    >
                      <Icon />
                    </ResponsiveTooltip>
                  </IconContainer>
                </Fragment>
              );
            })}
          </div>
        </div>
        {/* content (carousel - cards) */}
        <div className="w-full grow overflow-auto | flex flex-col gap-2 ">
          <Container>
            {apps.map((app) => (
              <AppDetailContainer key={app.id} appId={app.id}>
                <AppVerticalCardView
                  app={app}
                  cardsLayout={cardsLayout}
                  sort={sortOrder}
                  // explore 页需要大屏的图
                  size={"raw"}
                />
              </AppDetailContainer>
            ))}
          </Container>

          {/* load more */}
          {query.hasNextPage === false ? ( // note: 显式指明
            <div className="| | m-auto flex w-80 items-center justify-center bg-destructive p-4 text-center text-destructive-foreground">
              You have loaded ALL the data.
            </div>
          ) : (
            <ScrollTrigger trigger={query.fetchNextPage} />
          )}
        </div>
      </div>
    </RootLayout>
  );
}

function HomeCarousel() {
  return (
    <Carousel
      className={clsx("mx-auto w-full rounded-2xl md:w-[788px]")}
      showThumbs={false}
      infiniteLoop
      autoPlay
      interval={3000}
      showStatus={false}
      centerMode
      centerSlidePercentage={92}
      stopOnHover={false}
    >
      {CAROUSELS.map((item) => (
        <AspectRatio ratio={2} key={item.title}>
          <Image
            src={item.src}
            className="object-cover object-bottom"
            alt={item.title}
            fill
            sizes="w-full rounded-2xl"
          />
          <p className="legend">{item.title}</p>
        </AspectRatio>
      ))}
    </Carousel>
  );
}

function ScrollTrigger({ trigger }: { trigger: any }) {
  const { t } = useTranslation();
  const { ref, entry } = useIntersection({ rootMargin: "400px" });

  useEffect(() => {
    if (entry?.isIntersecting) {
      trigger();
    } else {
      // 取消触底（往回拉）
    }
  }, [entry?.isIntersecting]);
  return (
    <p
      ref={ref}
      className={clsx(
        "flex-center m-auto shrink-0 rounded-2xl px-16 py-8",
        " animate-pulse bg-card font-bold text-primary-foreground",
      )}
    >
      {entry?.isIntersecting && t("common:LoadingMoreData")}
    </p>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "explore"])),
    },
  };
}
