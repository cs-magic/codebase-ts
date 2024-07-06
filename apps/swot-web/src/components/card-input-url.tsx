"use client"

import { useAtom } from "jotai"
import React from "react"
import { Input } from "@cs-magic/common"
import { LabelLine } from "@cs-magic/common"

import { config } from "@cs-magic/common"
import { cardArticleUrlAtom } from "../store/card.atom"

export const CardInputUrl = () => {
  const [inputUrl, setInputUrl] = useAtom(cardArticleUrlAtom)

  return (
    <LabelLine title={"url"}>
      <Input
        id={"card-input-url"}
        placeholder={config.card.genInputPlaceHolder}
        className={"grow"}
        value={inputUrl}
        onChange={(event) => {
          setInputUrl(event.currentTarget.value)
        }}
      />
    </LabelLine>
  )
}
