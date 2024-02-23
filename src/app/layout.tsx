import "@/styles/globals.css"

import { Inter } from "next/font/google"

import { TRPCReactProvider } from "@/trpc/react"
import ThemeProvider from "@/providers/theme"
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "@/providers/session"
import { LoadingAlertDialog } from "@/components/dialog"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Way To AGI",
  description: "Way To AGI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} h-screen`}>
        <ThemeProvider defaultTheme={"dark"} attribute={"class"}>
          <SessionProvider>
            <TRPCReactProvider>
              {children}

              <Toaster />

              <LoadingAlertDialog />
            </TRPCReactProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
