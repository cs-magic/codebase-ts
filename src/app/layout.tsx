import "@/styles/globals.css"

import { Inter } from "next/font/google"

import { TRPCReactProvider } from "@/trpc/react"
import ThemeProvider from "@/providers/theme"
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "@/providers/session"
import { LoadingAlertDialog } from "@/components/dialog"
import { type Viewport } from "next"
import AutoHeightProvider from "@/providers/AutoHeightProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Sokka",
  description: "Sokka | Soga | WayToAGI | CS-Magic | CSMagic",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

// ref: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#use-viewport-export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} h-screen`}>
        <AutoHeightProvider>
          <ThemeProvider defaultTheme={"dark"} attribute={"class"}>
            <SessionProvider>
              <TRPCReactProvider>
                {children}

                <Toaster richColors />

                <LoadingAlertDialog />
              </TRPCReactProvider>
            </SessionProvider>
          </ThemeProvider>
        </AutoHeightProvider>
      </body>
    </html>
  )
}
