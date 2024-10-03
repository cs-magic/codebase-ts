import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React from "react";

import { RootLayout } from "@/components/layouts/root.layout";
import { Loading } from "@cs-magic/react/components/loading";
import { UserProfile } from "@/components/user/profile.view";
import { type NextPageWithAuth } from "@/ds";
import { trpcApi } from "@/trpc-api";

export const DashboardPage: NextPageWithAuth = () => {
  const router = useRouter();
  const userId = router.query.id as string;
  // console.log("dashboard: ", { userId })
  const { data: userProfile } = trpcApi.user.getProfile.useQuery(
    { id: userId },
    { enabled: !!userId },
  );

  return (
    <RootLayout>
      <div className="grid grid-cols-1 gap-4 overflow-auto p-4 md:grid-cols-2">
        {!userProfile ? <Loading /> : <UserProfile user={userProfile} />}
      </div>
    </RootLayout>
  );
};

export default DashboardPage;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
