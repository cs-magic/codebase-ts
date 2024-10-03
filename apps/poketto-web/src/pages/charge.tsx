import StripePricingTable from "@cs-magic/common/stripe/components/pricing-table";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import { RootLayout } from "@/components/layouts/root.layout";

export default function GalleryPage() {
  return (
    <RootLayout>
      <div className={"w-full max-w-[1080px] m-auto h-[90%] overflow-auto"}>
        <StripePricingTable />
      </div>
    </RootLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
