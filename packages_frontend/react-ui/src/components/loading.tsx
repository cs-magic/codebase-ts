"use client"

import { useAtom } from "jotai"
import { LoaderIcon } from "lucide-react"
import React from "react"

import { uiLoadingAlertDialogAtom } from "@cs-magic/react-hooks/dist/store/ui.atom.js"

import { FlexContainer } from "./flex-container"
import { AlertDialog, AlertDialogContent } from "@/shadcn/ui/alert-dialog"

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
      <AlertDialogContent
        className={
          "flex items-center justify-center bg-transparent border-none"
        }
      >
        <Loading />
      </AlertDialogContent>
    </AlertDialog>
  )
}
