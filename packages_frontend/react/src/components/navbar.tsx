"use client";

import { ButtonLink } from "@/components/button-link";
// todo: added localeSwitcher, after fixing: `react-i18next:: You will need to pass in an i18next instance by using initReactI18next`
// import { LocaleSwitcher } from "@/components/locale-switcher"
import { CompanyLogo } from "@/components/company-logo";
import { uri } from "@/config";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@cs-magic/shadcn/dist/ui/navigation-menu";
import { clsx } from "clsx";
import Link from "next/link";
import { ReactNode } from "react";
import { useMeasure } from "react-use";

export const Navbar = ({ productBanner }: { productBanner?: ReactNode }) => {
  const [ref, { height }] = useMeasure<HTMLDivElement>();
  // console.log({ height });

  return (
    <>
      <div
        ref={ref}
        className={
          "fixed top-0 left-0 w-full bg-black/[.50] backdrop-blur-lg z-[9999] border-b"
        }
      >
        <div
          className={
            "w-full sm:max-w-[1440px] z-50 px-4 mx-auto py-3 flex justify-between items-center gap-2  font-light"
          }
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
                  CS Magic
                </h1>
              )}
            </Link>

            {productBanner && (
              <>
                <svg
                  height="32"
                  role="separator"
                  viewBox="0 0 32 32"
                  width="32"
                >
                  <path
                    d="M22 5L9 28"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>

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

      <div style={{ height }} />
    </>
  );
};
