import { ArrowRightIcon } from "@radix-ui/react-icons";
import range from "lodash/range";
import sampleSize from "lodash/sampleSize";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import { Button } from "@cs-magic/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@cs-magic/shadcn/ui/card";
import { Skeleton } from "@cs-magic/shadcn/ui/skeleton";

import { AppHorizontalCardView } from "@/components/app/card-horizontal.view";
import { AppDetailContainer } from "@/components/app/container";
import { URI } from "@/config";
import { trpcApi } from "@/trpc-api";

const k = 3;
const n = 5;

export function ExploreAppsWidget() {
  const { i18n, t } = useTranslation();

  const query = trpcApi.app.list.useInfiniteQuery(
    {
      limit: n,
      language: i18n.language === "zh-CN" ? "zh" : "en",
    },
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
    },
  );
  const apps = query.data?.pages.flatMap((item) => item.items);

  // console.log({ apps })

  return (
    <Card id="explore" className="w-full grow | flex flex-col">
      <CardHeader>
        <div className="| flex shrink-0 items-end justify-between">
          <CardTitle>{t("homepage:ExploreTrendingApps")}</CardTitle>
          <Link href={URI.app.explore}>
            <Button
              variant="link"
              className="| flex h-fit items-center gap-2 py-0 text-xs"
            >
              <span>{t("homepage:ExploreAll")}</span>
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="w-full grow | flex justify-between">
        <div className="w-full h-full | flex flex-col divide-y">
          {!apps
            ? range(k).map((i) => (
                <div
                  key={i}
                  className={"w-full h-20 flex items-center gap-4 py-6 "}
                >
                  <Skeleton className={"wh-20"} />
                  <div className={"grow flex flex-col gap-2"}>
                    <Skeleton className={"w-full h-4"} />
                    <Skeleton className={"w-full h-4"} />
                    <Skeleton className={"w-full h-4"} />
                  </div>
                  <div className={"w-8 flex flex-col gap-2"}>
                    <Skeleton className={"w-full h-4"} />
                    <Skeleton className={"w-full h-4"} />
                  </div>
                </div>
              ))
            : apps.length >= n &&
              sampleSize(range(n), k).map((i) => (
                <AppDetailContainer appId={apps[i]!.id} key={i}>
                  <AppHorizontalCardView app={apps[i]} key={i} />
                </AppDetailContainer>
              ))}
        </div>
      </CardContent>
    </Card>
  );
}
