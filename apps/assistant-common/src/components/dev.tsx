"use client";

import { DevSocketStatus } from "@/components/dev-socket-status";

import { DevConfig } from "./dev-config";

export const Dev = () => {
  return (
    <>
      {/*<DevData />*/}

      <DevConfig />

      <DevSocketStatus />
    </>
  );
};
