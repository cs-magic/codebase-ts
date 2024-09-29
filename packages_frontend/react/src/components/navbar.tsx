"use client";

import { ButtonLink } from "@/components/button-link";
// todo: added localeSwitcher, after fixing: `react-i18next:: You will need to pass in an i18next instance by using initReactI18next`
// import { LocaleSwitcher } from "@/components/locale-switcher"
import { CompanyLogo } from "@/components/company-logo";
import { uri } from "@/config";
import { NAVBAR_ID } from "@/const";
import { navbarHeightAtom } from "@/store";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@cs-magic/shadcn/ui/navigation-menu";
import { clsx } from "clsx";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { useMeasure } from "react-use";
import DiagonalSeparatorSVG from "@assets/others/diagnoal-separator.svg";

export const Navbar = ({ productBanner }: { productBanner?: ReactNode }) => {
  const [ref, { height }] = useMeasure<HTMLDivElement>();
  const setNavbarHeight = useSetAtom(navbarHeightAtom);

  useEffect(() => {
    if (!height) return;

    setNavbarHeight(height);
  }, [height]);

  return (
    <div
      ref={ref}
      id={NAVBAR_ID}
      className={
        "sticky top-0 left-0 w-full bg-background/50 backdrop-blur-lg z-[9999] border-b border-gray-500/30"
      }
    >
      <div
        className={
          "w-full sm:max-w-[1440px] z-50 px-4 mx-auto py-3 flex justify-between items-center gap-2 font-light"
        }
      >
        <div className={clsx("flex items-center gap-0 sm:gap-2 px-2 h-12")}>
          <Link
            className={"inline-flex-center gap-2 whitespace-nowrap"}
            href={uri.company}
          >
            <CompanyLogo width={32} height={32} />

            {!productBanner && (
              <h1 className={clsx("text-2xl font-medium", "tracking-[0.1rem]")}>
                CS Magic
              </h1>
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
            <NavigationMenuList
              className={"gap-2 md:gap-4 inline-flex whitespace-nowrap"}
            >
              {/* todo: variant thinner / outline */}

              <ButtonLink
                href={"https://cs-magic.cn/docs"}
                variant={"link"}
                className={"text-bold"}
              >
                Docs
              </ButtonLink>

              <ButtonLink
                href={"https://cs-magic.canny.io"}
                variant={"link"}
                className={"text-bold"}
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
  );
};
