"use client"

import { AlertDialog, AlertDialogContent } from "@cs-magic/shadcn/ui/alert-dialog"
import { useAtom } from "jotai"
import React, { type PropsWithChildren } from "react"


import { uiAlertDialogOpen } from "@/store/ui.atom"

export const ContentAlertDialog = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useAtom(uiAlertDialogOpen)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        onClick={() => {
          setOpen(false)
        }}
      >
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}
