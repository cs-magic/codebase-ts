import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import { AppDetailView } from "@/components/app/detail.view";
import { ConversationCore } from "@/components/conv/core";
import { ConversationList } from "@/components/conv/list";
import { RootLayout } from "@/components/layouts/root.layout";
import { trpcApi } from "@/trpc-api";
import clsx from "@/lib/clsx";

export default function ConversationPage() {
  const router = useRouter();
  const userId = router.query.userId as string;
  const appId = router.query.appId as string;
  const { data: curConv } = trpcApi.conv.get.useQuery(
    {
      conversation: {
        userId,
        appId,
      },
    },
    { enabled: !!(userId && appId) },
  );
  // console.log({ userId, appId, curConv })

  return (
    <RootLayout>
      <div className={clsx("flex h-full w-full", "overflow-hidden")}>
        <section className="hidden w-full shrink-[.1] lg:flex lg:w-[375px]">
          <ConversationList />
        </section>

        <section
          className={clsx("relative w-full lg:grow", " overflow-hidden")}
        >
          {curConv && <ConversationCore conversationId={curConv.id} />}
        </section>

        <section className={clsx("hidden shrink-[.1] xl:flex xl:w-[375px]")}>
          {curConv && <AppDetailView appId={curConv.appId} />}
        </section>
      </div>
    </RootLayout>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
