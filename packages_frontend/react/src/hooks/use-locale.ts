import { useTranslation } from "next-i18next"
import { DEFAULT_LOCALE_TYPE, LocaleNameSpace, LocaleType } from "../locales"
import { useRouter } from "next/router"

export const useLocale = () => {
  // @ts-ignore
  const { i18n } = useTranslation(LocaleNameSpace.manufacture)
  return i18n.language ?? DEFAULT_LOCALE_TYPE
}

export const useSimplifiedChinese = () => useLocale() === LocaleType.zh_CN

export const useSwitchLocale = () => {
  const router = useRouter()
  const { pathname, asPath, query } = router
  return (newLocale: LocaleType) =>
    router.push({ pathname, query }, router.asPath, { locale: newLocale })
}
