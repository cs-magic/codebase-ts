import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { RootLayout } from "@/components/layouts/root.layout"

export default function WhatsDoraPage() {
  return <RootLayout>From Poketto Official: 很快就会上线，请再耐心等等吧！</RootLayout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
