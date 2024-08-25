import { IconLanguage } from "@tabler/icons-react"
import { useTranslation } from "next-i18next"

import { ICON_SIZE_MD } from "../config"

import { useSwitchLocale } from "@/hooks/use-locale"
import { LocaleNameSpace, LocaleType } from "@/locales"

export const LocaleSwitcher = () => {
  const { t, i18n } = useTranslation(LocaleNameSpace.manufacture)
  const switchLocale = useSwitchLocale()

  return (
    <IconLanguage
      className={"cursor-pointer shrink-0 text-muted-foreground hocus:text-accent-foreground"}
      size={ICON_SIZE_MD}
      onClick={() => {
        const curLang = i18n.language
        const nextLang =
          // default is zh_CN
          curLang === LocaleType.en ? LocaleType.zh_CN : LocaleType.en
        console.log(`changing locale: ${curLang} --> ${nextLang}`)

        void switchLocale(nextLang)
      }}
    />
  )
}
