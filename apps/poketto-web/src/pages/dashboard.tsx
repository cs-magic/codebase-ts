import d from "@cs-magic/common/datetime";
import { useElementSize } from "@mantine/hooks";
import { StripePayment } from "@prisma/client";
import { ChevronDownIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import { Button } from "@cs-magic/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@cs-magic/shadcn/ui/card";
import { Input } from "@cs-magic/shadcn/ui/input";

import { DataTable } from "@/components/data-table";
import { RootLayout } from "@/components/layouts/root.layout";
import { Loading } from "@cs-magic/react/components/loading";
import { UserProfile } from "@/components/user/profile.view";
import { MAX_MOBILE_WIDTH } from "@/config";
import { type NextPageWithAuth, SelectChatMessageForDetailView } from "@/ds";
import { useUserInDb as useUser } from "@/hooks/use-user-in-db";
import { trpcApi } from "@/trpc-api";
import clsx from "@/lib/clsx";

export const DashboardPage: NextPageWithAuth = () => {
  const { t } = useTranslation();
  const { userId } = useUser();
  // console.log("dashboard: ", { userId })
  const { data: userProfile } = trpcApi.user.getProfile.useQuery(
    { id: userId },
    { enabled: !!userId },
  );
  const { data: payments } = trpcApi.bill.listPayments.useQuery();
  const { data: messages } = trpcApi.message.list.useQuery(
    { userId },
    { enabled: !!userId },
  );

  const paymentHistoryColumns: ColumnDef<StripePayment>[] = [
    {
      accessorKey: "productId",
      header: t("dashboard:ProductID"),
    },
    {
      accessorKey: "redeemCode",
      header: t("dashboard:RedeemCode"),
    },
    {
      accessorKey: "count",
      header: t("dashboard:Quantity"),
    },
  ];

  const consumptionHistoryColumns: ColumnDef<SelectChatMessageForDetailView>[] =
    [
      {
        accessorKey: "createdAt",
        header: t("dashboard:CreatedAt"),
        cell: ({ getValue }) => (
          <div className={"whitespace-nowrap"}>
            {d(getValue() as string).format("YYYY-MM-DD HH:mm")}
          </div>
        ),
      },
      {
        accessorKey: "content",
        header: t("dashboard:Content"),
        cell: ({ getValue }) => (
          <div className="max-h-12 overflow-auto">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "cost",
        header: () => (
          <div className={"whitespace-nowrap"}>{t("dashboard:Cost")}</div>
        ),
      },
    ];

  return (
    <RootLayout>
      <div className="flex flex-col w-full md:max-w-[80%] mx-auto gap-4 overflow-auto">
        {!userProfile ? <Loading /> : <UserProfile user={userProfile} />}

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard:Usage")}</CardTitle>
          </CardHeader>
          <CardContent className={"p-0"}>
            {messages ? (
              <DataTable columns={consumptionHistoryColumns} data={messages} />
            ) : (
              <Loading />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard:Payments")}</CardTitle>
          </CardHeader>
          <CardContent className={"p-0"}>
            {payments ? (
              <DataTable columns={paymentHistoryColumns} data={payments} />
            ) : (
              <Loading />
            )}
          </CardContent>
        </Card>
      </div>
    </RootLayout>
  );
};

DashboardPage.auth = true;

export default DashboardPage;

export function ConversationsToolView() {
  const { ref, width, height } = useElementSize();
  const expand = width > MAX_MOBILE_WIDTH;
  return (
    <div
      ref={ref}
      className={clsx("my-2 gap-2", expand ? "flex " : "grid grid-cols-1")}
    >
      <Input className="grow" placeholder="Find an app..." />
      <div className="flex grow items-center justify-between gap-2">
        <Button variant="outline" className="h-full gap-2">
          Category {expand && <ChevronDownIcon />}
        </Button>
        <Button variant="outline" className="h-full gap-2">
          Language {expand && <ChevronDownIcon />}
        </Button>
        <Button variant="outline" className="h-full gap-2">
          Sort {expand && <ChevronDownIcon />}
        </Button>
        <Button className="h-full gap-2 bg-primary">
          {expand && <Pencil2Icon />} New
        </Button>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
    },
  };
}
