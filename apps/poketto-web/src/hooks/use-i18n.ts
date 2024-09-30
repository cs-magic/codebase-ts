import { useTranslation } from "next-i18next"

import { DEFAULT_LOCALE } from "@/config"

export const useLocale = () => {
  const { i18n } = useTranslation()
  return i18n.language ?? DEFAULT_LOCALE
}
