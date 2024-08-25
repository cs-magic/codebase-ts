"use client"

import { useAtom } from "jotai"
import { LoaderIcon } from "lucide-react"
import React from "react"

import { AlertDialog, AlertDialogContent } from "@cs-magic/shadcn/dist/ui/alert-dialog"

import { FlexContainer } from "./flex-container"
import { uiLoadingAlertDialogAtom } from "@/store/ui.atom"

export const Loading = () => (
  <FlexContainer>
    <LoaderIcon className={"animate-spin"} />
  </FlexContainer>
)

export const LoadingAlertDialog = () => {
  const [loading] = useAtom(uiLoadingAlertDialogAtom)
  // console.log("LoadingAlertDialog: ", { loading })

  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className={"flex items-center justify-center bg-transparent border-none"}>
        <Loading />
      </AlertDialogContent>
    </AlertDialog>
  )
}
