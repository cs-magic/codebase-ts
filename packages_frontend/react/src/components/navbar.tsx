import { clsx } from "clsx"
import { useTranslation } from "next-i18next"
import Link from "next/link"

import { uri } from "@/config"
import { useSimplifiedChinese } from "@/hooks/use-locale"
import { NavigationMenu, NavigationMenuList } from "@/shadcn/ui/navigation-menu"
import { ButtonLink } from "@/components/button-link"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { CompanyLogo } from "@/components/company-logo"

export const Navbar = () => {
  const { t } = useTranslation()
  const isChinese = useSimplifiedChinese()

  return (
    <nav
      className={clsx(
        "fixed top-0 z-50 bg-black/[.50] backdrop-blur-lg w-full flex py-3 px-4 lg:px-8 justify-between items-center font-light gap-2",
      )}
    >
      <div className={clsx("inline-flex-center gap-2 px-2")}>
        <Link
          className={"inline-flex-center gap-2 whitespace-nowrap"}
          href={uri.home}
        >
          <CompanyLogo width={32} height={32} />
          <h1
            className={clsx(
              // 'font-semibold',
              isChinese && "tracking-[0.3rem]",
            )}
          >
            CS 魔法社
          </h1>
        </Link>
      </div>

      <div className={"flex items-center gap-2"}>
        <NavigationMenu
          className={clsx(
            // 'hidden',
            " md:flex",
          )}
        >
          <NavigationMenuList
            className={"gap-2 md:gap-4 inline-flex whitespace-nowrap"}
          >
            {/* todo: variant thinner / outline */}
            <ButtonLink
              variant={"outline"}
              href={
                "https://apifox.com/apidoc/shared-6f09e650-ab7f-4253-a113-38df1157c8df/doc-5021508"
              }
            >
              文档
            </ButtonLink>

            <ButtonLink href={"https://cs-magic.canny.io"}>反馈</ButtonLink>

            <LocaleSwitcher />

            {/*<PrimaryActionButton />*/}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
