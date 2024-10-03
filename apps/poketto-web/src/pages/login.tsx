import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { type Metadata } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

import { buttonVariants } from "@cs-magic/shadcn/ui/button";

import { ProductIcon } from "@/components/icons";
import { RootLayout } from "@/components/layouts/root.layout";
import { UserAuthForm } from "@/components/user-auth-form";
import { cn } from "@/lib/utils";

const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <RootLayout>
      <div className="container relative flex h-full w-full overflow-auto flex-col items-center justify-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8",
          )}
        >
          <>
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <ProductIcon className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              {
                // t("auth:WelcomeBack")
                "欢迎回来"
              }
            </h1>
          </div>

          <UserAuthForm />

          {/* <p className="px-8 text-center text-sm text-muted-foreground"> */}
          {/*  <Link href="/register" className="hover:text-brand underline underline-offset-4"> */}
          {/*    Don&apos;t have an account? Sign Up */}
          {/*  </Link> */}
          {/* </p> */}

          {/* todo: 条款和隐私政策 */}
          {/* <p className="px-8 text-center text-sm text-muted-foreground"> */}
          {/*  By clicking continue, you agree to our{" "} */}
          {/*  <Link href="/terms" className="hover:text-brand underline underline-offset-4"> */}
          {/*    Terms of Service */}
          {/*  </Link>{" "} */}
          {/*  and{" "} */}
          {/*  <Link href="/privacy" className="hover:text-brand underline underline-offset-4"> */}
          {/*    Privacy Policy */}
          {/*  </Link> */}
          {/*  . */}
          {/* </p> */}
        </div>
      </div>
    </RootLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "auth"])),
    },
  };
}
