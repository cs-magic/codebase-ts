import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { ErrorSVG } from "@/components/icons"
import { RootLayout } from "@/components/layouts/root.layout"

export default function Custom404() {
  return (
    <RootLayout>
      <div className="flex h-full w-full flex-col items-center gap-2 overflow-auto">
        <h1 className="mt-8 text-4xl">404</h1>
        <p>{"Poketto Note: You've come to the wilderness of knowledge."}</p>

        <ErrorSVG width={480} className="shrink-0 wh-[240px] md:wh-[480px]" />
      </div>
    </RootLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
