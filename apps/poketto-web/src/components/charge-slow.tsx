import { defaultModelQuota, modelTypes } from "@/ds";
import { useUserInDb } from "@/hooks/use-user-in-db";
import { ChargeContainer } from "@cs-magic/common/stripe/components/charge-container";

import { Button } from "@cs-magic/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@cs-magic/shadcn/ui/card";
import { useTranslation } from "next-i18next";
import * as React from "react";

const SlowChargeForm = () => {
  const { t } = useTranslation();
  const user = useUserInDb();

  const quota = "quota" in user ? user.quota : defaultModelQuota;

  return (
    <div className={"columns-2"}>
      <Card className={"bg-transparent border-none"}>
        <CardHeader className={"p-2"}>
          <CardDescription>当前余额</CardDescription>
        </CardHeader>
        <CardContent className={"p-2 flex flex-col gap-2"}>
          <div className={"flex justify-between gap-4"}>
            Dora
            <span className={"text-xs text-muted-foreground ml-2"}>
              {"balance" in user ? (user.balance as number) : 0}
            </span>
          </div>
          <ChargeContainer className={"w-full"} asChild>
            <Button variant={"outline"} className={"w-full"}>
              续航
            </Button>
          </ChargeContainer>
        </CardContent>
      </Card>

      {/*<Separator orientation={"vertical"} />*/}

      <Card className={"bg-transparent border-none"}>
        <CardHeader className={"p-2"}>
          <CardDescription>今日试用剩余</CardDescription>
        </CardHeader>
        <CardContent className={"p-2"}>
          {modelTypes.map((k) => (
            <div key={k} className={"flex justify-between gap-4"}>
              {k}
              <span className={"text-xs text-muted-foreground ml-2"}>
                {quota![k]}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SlowChargeForm;
