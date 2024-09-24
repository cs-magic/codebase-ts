"use client";

import { useAtom } from "jotai";
import { Ellipsis, LoaderIcon } from "lucide-react";
import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
} from "@cs-magic/shadcn/dist/ui/alert-dialog";

import { FlexContainer } from "./flex-container";
import { uiLoadingAlertDialogAtom } from "@/store/ui.atom";

export const Loading = ({ type = "spin" }: { type?: "spin" | "dots" }) => (
  <FlexContainer className={"overflow-hidden"}>
    {type === "spin" ? (
      <LoaderIcon className={"animate-spin"} />
    ) : (
      // <span className="loading loading-dots loading-sm"></span>
      <div className={"loader"} />
    )}
  </FlexContainer>
);

export const LoadingAlertDialog = () => {
  const [loading] = useAtom(uiLoadingAlertDialogAtom);
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
  );
};
