"use client"

import { LabelLine } from "@cs-magic/react-ui"
import { Input } from "@cs-magic/react-ui"
import { cardUserAvatarRenderedAtom } from "../store/card.rendered.atom"
import { useAtom } from "jotai"
import React from "react"
import { cardUserAvatarAtom, cardUserNameAtom } from "../store/card.user.atom"

export const CardInputUser = () => {
  const [cardUserName, setCardUserName] = useAtom(cardUserNameAtom)
  const [cardUserAvatar, setCardUserAvatar] = useAtom(cardUserAvatarAtom)
  const [, setCardUserAvatarRendered] = useAtom(cardUserAvatarRenderedAtom)

  return (
    <>
      <LabelLine title={"user.name"}>
        <Input
          id={"card-user-name"}
          value={cardUserName}
          onChange={(event) => {
            setCardUserName(event.currentTarget.value)
          }}
        />
      </LabelLine>

      <LabelLine title={"user.avatar"}>
        <Input
          id={"card-user-avatar"}
          value={cardUserAvatar}
          onChange={(event) => {
            setCardUserAvatarRendered(false)
            setCardUserAvatar(event.currentTarget.value)
          }}
        />
      </LabelLine>
    </>
  )
}