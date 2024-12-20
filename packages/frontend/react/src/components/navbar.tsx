"use client"

import DiagonalSeparatorSVG from "@assets/others/diagnoal-separator.svg"
import { NavigationMenu, NavigationMenuList } from "@cs-magic/shadcn/ui/navigation-menu"
import { clsx } from "clsx"
import { useSetAtom } from "jotai"
import Link from "next/link"
import { type ReactNode, useEffect } from "react"
import { useMeasure } from "react-use"


import { ButtonLink } from "@/components/button-link"
// todo: added localeSwitcher, after fixing: `react-i18next:: You will need to pass in an i18next instance by using initReactI18next`
// import { LocaleSwitcher } from "@/components/locale-switcher"
import { CompanyLogo } from "@/components/company-logo"
import { uri } from "@/config"
import { NAVBAR_ID } from "@/const"
import { navbarHeightAtom } from "@/store"

export const Navbar = ({ productBanner }: { productBanner?: ReactNode }) => {
  const [ref, { height }] = useMeasure<HTMLDivElement>()
  const setNavbarHeight = useSetAtom(navbarHeightAtom)

  useEffect(() => {
    if (!height) return

    setNavbarHeight(height)
  }, [height])

  return (
    <div
      ref={ref}
      className={
        "sticky top-0 left-0 w-full bg-background/50 backdrop-blur-lg z-[9999] border-b border-gray-500/30"
      }
      id={NAVBAR_ID}
    >
      <div
        className={
          "w-full sm:max-w-[1440px] z-50 px-4 mx-auto py-3 flex justify-between items-center gap-2 font-light"
        }
      >
        <div className={clsx("flex items-center gap-0 sm:gap-2 px-2 h-12")}>
          <Link className={"inline-flex-center gap-2 whitespace-nowrap"} href={uri.company}>
            <CompanyLogo height={32} width={32} />

            {!productBanner && (
              <h1 className={clsx("text-2xl font-medium", "uppercase")}>Neurora</h1>
            )}
          </Link>

          {productBanner && (
            <>
              <DiagonalSeparatorSVG className={"w-6"} />

              <Link href={"/"}>{productBanner}</Link>
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
            <NavigationMenuList className={"gap-2 md:gap-4 inline-flex whitespace-nowrap"}>
              {/* todo: variant thinner / outline */}

              <ButtonLink
                className={"text-bold"}
                href={"https://cs-magic.cn/docs"}
                variant={"link"}
              >
                Docs
              </ButtonLink>

              <ButtonLink
                className={"text-bold"}
                href={"https://cs-magic.canny.io"}
                variant={"link"}
              >
                Feedback
              </ButtonLink>

              {/*<LocaleSwitcher />*/}

              {/*<PrimaryActionButton />*/}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  )
}
