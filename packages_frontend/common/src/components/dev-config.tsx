"use client"

import { useHotkeys } from "@mantine/hooks"
import { useAtom } from "jotai"
import { SettingsIcon } from "lucide-react"
import { useState } from "react"

import { devEnabledAtom } from "@cs-magic/react-hooks/dist/store/dev.atom.js"

import { cn } from "@cs-magic/react-ui/shadcn/utils"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@cs-magic/react-ui/shadcn/ui/sheet"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@cs-magic/react-ui/shadcn/ui/tabs"
import { IconContainer } from "@cs-magic/react-ui/components/icon-container"

import { ConfigDevCard } from "./config-dev-card"
import { ConfigLogCard } from "./config-log-card"
import { ConfigSMSCard } from "./config-sms"
import { UserSignOutButton } from "./user-sign-out-button"

export const DevConfig = () => {
  const [devEnabled] = useAtom(devEnabledAtom)

  const [open, setOpen] = useState(false)

  useHotkeys([
    [
      "shift+mod+P",
      () => {
        setOpen(true)
      },
    ],
  ])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          "fixed bottom-2 left-2",
          process.env.NODE_ENV === "production" && !devEnabled && "hidden",
        )}
        asChild
      >
        <IconContainer>
          <SettingsIcon />
        </IconContainer>
      </SheetTrigger>

      <SheetContent side={"left"} className={"w-screen sm:max-w-[480px]"}>
        <Tabs defaultValue={"llm"}>
          <TabsList className={"w-full "}>
            <TabsTrigger value={"auth"}>Auth</TabsTrigger>
            <TabsTrigger value={"llm"}>LLM</TabsTrigger>
            <TabsTrigger value={"sms"}>SMS</TabsTrigger>
            <TabsTrigger value={"log"}>LOG</TabsTrigger>
            <TabsTrigger value={"trpc"}>TRPC</TabsTrigger>
            <TabsTrigger value={"dev"}>DEV</TabsTrigger>
          </TabsList>

          <TabsContent value={"auth"}>
            <UserSignOutButton />
          </TabsContent>

          <TabsContent value={"llm"}></TabsContent>

          <TabsContent value={"sms"}>
            <ConfigSMSCard />
          </TabsContent>

          <TabsContent value={"log"}>
            <ConfigLogCard />
          </TabsContent>

          {/*<TabsContent value={"trpc"}><ConfigTRPCCard /></TabsContent>*/}

          <TabsContent value={"dev"}>
            <ConfigDevCard />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}