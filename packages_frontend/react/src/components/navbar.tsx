"use client"

import { clsx } from "clsx"
import Link from "next/link"

import { uri } from "@/config"
import { NavigationMenu, NavigationMenuList } from "@cs-magic/shadcn/dist/ui/navigation-menu"
import { ButtonLink } from "@/components/button-link"
// todo: added localeSwitcher, after fixing: `react-i18next:: You will need to pass in an i18next instance by using initReactI18next`
// import { LocaleSwitcher } from "@/components/locale-switcher"
import { CompanyLogo } from "@/components/company-logo"
import { ReactNode } from "react"

export const Navbar = ({ productBanner }: { productBanner?: ReactNode }) => {
  return (
    <nav
      className={clsx(
        "fixed top-0 z-50 bg-black/[.50] backdrop-blur-lg w-full flex py-3 px-4 lg:px-8 justify-between items-center font-light gap-2",
      )}
    >
      <div className={clsx("flex items-center gap-2 px-2 h-12")}>
        <Link
          className={"inline-flex-center gap-2 whitespace-nowrap"}
          href={uri.company}
        >
          <CompanyLogo width={32} height={32} />

          {!productBanner && (
            <h1
              className={clsx(
                // 'font-semibold',
                "tracking-[0.3rem]",
              )}
            >
              CS 魔法社
            </h1>
          )}
        </Link>

        {productBanner && (
          <>
            <svg height="32" role="separator" viewBox="0 0 32 32" width="32">
              <path
                d="M22 5L9 28"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>

            {productBanner}
          </>
        )}
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

            {/*<LocaleSwitcher />*/}

            {/*<PrimaryActionButton />*/}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
