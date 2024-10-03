import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import React from "react";
import { Toaster } from "sonner";

import { TooltipProvider } from "@cs-magic/shadcn/ui/tooltip";

import ErrorBoundary from "@/components/error-boundary";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config";
import { type ExtendedAppProps } from "@/ds";
import { trpcApi } from "@/trpc-api";
import clsx from "@/lib/clsx";
import d from "@cs-magic/common/datetime";
import { fontHeading, fontSans } from "@/lib/fonts";
import { getOrigin } from "@cs-magic/common/router";

import "@assets/styles/main.css";

// todo: nextjs log best practice: 1. universal 2. bind console
const originalLog = console.log; // Store the original console.log function

console.log = function (...args: any[]) {
  const currentTime = d(new Date()).format("YYYY-MM-DD ddd HH:mm:ss Z");
  // eslint-disable-next-line prefer-rest-params
  originalLog.apply(console, [`[${currentTime}]`, ...args]);
};

function reportWebVitals(metric) {
  console.log(metric);
}

const metadata = {
  metadataBase: new URL(getOrigin()),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Poketto AI",
    "MarkShawn",
    "南川",

    "AIGC",
    "OpenAI",
    "ChatGPT",
    "prompt",
    "FlowGPT",

    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "MarkShawn",
      url: "https://github.com/markshawn2020",
    },
  ],
  creator: "MarkShawn",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: getOrigin(),
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   images: [`${siteConfig.url}/og.jpg`],
  //   creator: "@MarkShawn",
  // },
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-logo.png",
  },
  manifest: `${getOrigin()}/site.webmanifest`,
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: ExtendedAppProps) {
  return (
    <>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        {/* prevent screen scale when input, ref: https://github.com/vercel/next.js/issues/7176#issuecomment-487350103 */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        {/*// <!-- Define the web app capable of running in full-screen mode -->*/}
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/*// <!-- Define the status bar style: default, black, or black-translucent -->*/}
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/*// <!-- Provide a title for the home2 screen icon -->*/}
        <meta name="apple-mobile-web-app-title" content="Your App Name" />

        <link rel="icon" href={siteConfig.icon.src} />
      </Head>

      <ErrorBoundary>
        <SessionProvider session={session}>
          <ThemeProvider>
            <TooltipProvider>
              <main
                className={clsx(
                  "min-w-[375px] max-w-screen w-auto | bg-background text-foreground text-sm font-light",
                  // 'bg-zinc-900',
                  // fontChinese.className
                  "font-sans antialiased",
                  fontSans.variable,
                  fontHeading.variable,
                )}
              >
                <Component {...pageProps} />
              </main>
            </TooltipProvider>
            <Toaster richColors closeButton position="top-right" />
            <TailwindIndicator />

            {/*<Analytics />*/}
          </ThemeProvider>
        </SessionProvider>
      </ErrorBoundary>
    </>
  );
}

export default trpcApi.withTRPC(appWithTranslation(MyApp));
