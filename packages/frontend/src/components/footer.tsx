import Link from "next/link";

import { beian, mossSlogan } from "@/config";

import { CompanySlogan } from "@/components/company-slogan";
import { isCurUrlDomestic } from "@/utils/host";

export const Footer = () => {
  return (
    <>
      <div
        className={
          "w-full flex flex-wrap justify-center items-center lg:gap-32 px-8 sm:px-16 lg:px-32 py-8 gap-12 bg-black text-white"
        }
      >
        <div
          className={
            "flex flex-col justify-center items-center gap-4 shrink-0 w-full md:w-fit order-last md:order-first"
          }
        >
          <CompanySlogan />

          <p className={"-ml-1 animate-pulse"}>{mossSlogan}</p>

          {isCurUrlDomestic() && (
            <Link
              className={"flex-center text-muted-foreground underline"}
              href="https://beian.miit.gov.cn/"
              target="_blank"
            >
              备案号：{beian.title}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
