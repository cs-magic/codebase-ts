import { cn } from "@cs-magic/react-ui/shadcn/utils"
import { PropsWithChildren } from "react"

import { FlexContainer } from "@cs-magic/react-ui/dist/components/flex-container.js"
import { Header } from "@cs-magic/common-frontend/components/header"

export default function SubLayout({ children }: PropsWithChildren) {
  // console.log(ansiColors.red("== SubLayout =="))

  return (
    <FlexContainer
      orientation={"vertical"}
      className={cn(
        "mx-auto h-full max-w-[1080px] !gap-0 overflow-hidden !p-0 ",
        // "bg-cyan-800"
      )}
    >
      <Header />

      <div className={"flex w-full grow flex-col overflow-hidden border-t"}>
        {children}
      </div>

      {/*<Footer />*/}
    </FlexContainer>
  )
}
