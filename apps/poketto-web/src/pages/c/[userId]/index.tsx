import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { ConversationList } from "@/components/conv/list"
import { RootLayout } from "@/components/layouts/root.layout"

export default function ConversationPage() {
  return (
    <RootLayout>
      <ConversationList />
    </RootLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
