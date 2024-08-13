"use client"

import { FlexContainer } from "@cs-magic/eval-ai/packages/common-ui/components/flex-container"
import { LabelLine } from "@cs-magic/eval-ai/packages/common-ui/components/label-line"
import { useInit } from "@cs-magic/react-hooks/dist/hooks/use-init.js"
import { useState } from "react"
import DDS_lanhupage_0 from "./comp"
import { IWechatPreference } from "@cs-magic/swot-backend/dist/schema/bot-preference.js"
import { IWechatBotTransfer } from "@cs-magic/swot-backend/dist/schema/bot-utils.js"
import { env } from "@cs-magic/common/dist/env/get-env.js"
import { socketStatusMap } from "@cs-magic/common/dist/transport/schema.js"

export default function SwotDashboardPage() {
  const [preference, setPreference] = useState<IWechatPreference | null>(null)

  // 南川
  const wxid = "5623476143790167642"

  const socket = useInit<WebSocket>(() => {
    const socket = new WebSocket(env.NEXT_PUBLIC_SOCKET_URL!)

    socket.onopen = () => {
      console.log("✅ opened")
      // 不要用 useEffect 监听这个
      socket.send(`get-preference ${wxid}`)
    }

    socket.addEventListener("error", console.error)

    socket.addEventListener("message", (event: MessageEvent<string>) => {
      // console.log({ event });

      try {
        const data = JSON.parse(event.data) as IWechatBotTransfer

        console.log("-- data: ", data)
        switch (data.type) {
          case "preference":
            setPreference(data.data)
            console.log("preference: ", data)
            break
        }
      } catch (e) {
        // prettyError(e);
      }
    })

    return socket
  })

  const Basic = () => {
    return (
      <>
        {socket && (
          <LabelLine title={"readyState"}>
            {socketStatusMap[socket.readyState]}
          </LabelLine>
        )}

        <LabelLine title={"preference"}>
          <div className={"whitespace-pre"}>
            {JSON.stringify(preference, null, 2)}
          </div>
        </LabelLine>
      </>
    )
  }

  return (
    <FlexContainer
      orientation={"vertical"}
      className={"justify-start overflow-auto"}
    >
      {/*<Basic/>*/}

      <DDS_lanhupage_0 />
    </FlexContainer>
  )
}
