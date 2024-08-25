"use client"

import { useAtom } from "jotai"
import React, { PropsWithChildren } from "react"

import { AlertDialog, AlertDialogContent } from "@cs-magic/shadcn/dist/ui/alert-dialog"

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
