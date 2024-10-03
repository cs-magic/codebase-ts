import { ArrowRightIcon } from "@radix-ui/react-icons";
import range from "lodash/range";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

import { Button } from "@cs-magic/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@cs-magic/shadcn/ui/card";
import { Skeleton } from "@cs-magic/shadcn/ui/skeleton";

import { AppVerticalCardView } from "@/components/app/card-vertical.view";
import { ExploreAppsWidget } from "@/components/app/explore.widget";
import { RootLayout } from "@/components/layouts/root.layout";
import { StatusItem } from "@/components/status";
import privacyEn from "@assets/docs/privacy/privacy_en.html";
import { CardsLayoutType } from "@/ds";
import { useUserInDb as useUser } from "@/hooks/use-user-in-db";
import { trpcApi } from "@/trpc-api";
import { getConversationLink, getConversationsLink } from "@/lib/string";

export default function HomePage() {
  console.log({ privacyEn });

  return (
    <RootLayout>
      <div className="h-full w-full overflow-auto | flex flex-col">
        <SystemStatus />
        <RecentConversations />
        <ExploreAppsWidget />

        <div className={"mt-auto text-center p-2"}>
          <Link
            href={privacyEn}
            className={"text-muted-foreground underline underline-offset-4"}
            target={"_blank"}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </RootLayout>
  );
}

export const SystemStatus = () => {
  const { t } = useTranslation();
  const { data: s } = trpcApi.system.status.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("homepage:PokettoToday")}</CardTitle>
      </CardHeader>

      <CardContent
        className={"w-full px-2 py-4 grid grid-cols-4 overflow-auto"}
      >
        <StatusItem
          a={t("homepage:Apps")}
          b={s ? s.apps : <Skeleton className={"w-12 h-4"} />}
          c={t("homepage:Total")}
        />

        <StatusItem
          a={t("homepage:Users")}
          b={s ? s.users : <Skeleton className={"w-12 h-4"} />}
          c={t("homepage:Total")}
        />

        <StatusItem
          a={t("homepage:Calls")}
          b={s ? s.calls : <Skeleton className={"w-12 h-4"} />}
          c={t("homepage:Total")}
        />

        <StatusItem
          a={t("homepage:Feedbacks")}
          b={s ? s.feedbacks : <Skeleton className={"w-12 h-4"} />}
          c={t("homepage:Total")}
        />
      </CardContent>
    </Card>
  );
};

export function RecentConversations() {
  const { t } = useTranslation();
  const { user } = useUser();
  const { data: conversations } = trpcApi.conv.list.useQuery(undefined, {
    enabled: !!user,
  });

  const n = 10;
  return (
    <Card id="recent-apps" className="w-full">
      <CardHeader>
        <div className="| flex shrink-0 items-end justify-between">
          <CardTitle>{t("homepage:RecentlyUsedApps")}</CardTitle>
          {user && (
            <Link
              href={getConversationsLink(user.id)}
              className="h-fit | flex items-center gap-2 py-0 text-xs text-primary"
            >
              <span>{t("common:general.seeAll")}</span>
              <ArrowRightIcon />
            </Link>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex w-full gap-2 p-2 overflow-auto">
        {!user ? (
          <div className={"mx-4"}>
            {t("homepage:LoginToSeeApp")}
            <Button variant="link" onClick={() => void signIn()}>
              {t("common:Login")}
            </Button>
          </div>
        ) : !conversations ? (
          <>
            {range(n).map((i) => (
              <Skeleton key={i} className={"w-48 h-72 shrink-0"} />
            ))}
          </>
        ) : (
          conversations.slice(0, n).map((c) => (
            //   正常情况下，我们应该用 PopContent，然后进入，不过这里是已经安装好的app，因此直接link过去比较好
            <Link
              className="w-48 shrink-0"
              key={c.appId}
              href="/c/[userId]/[appId]"
              as={getConversationLink(c.userId, c.appId)}
            >
              <AppVerticalCardView
                app={c.app}
                cardsLayout={CardsLayoutType.grid}
                sort="newest"
                key={c.appId}
              />
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "homepage"])),
    },
  };
}
