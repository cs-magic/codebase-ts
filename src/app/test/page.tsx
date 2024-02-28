"use client"

import { ButtonLink } from "@/components/buttons"

export default function TestPage() {
  return (
    <>
      <ButtonLink href={"test/check-reconstruction"}>
        Check Re-Construction
      </ButtonLink>

      <ButtonLink href={"test/socket"}>Socket</ButtonLink>
    </>
  )
}
