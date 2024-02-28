"use client"

import { Container } from "@/components/containers"
import { V2AGIBrand } from "@/config/assets"
import { Label } from "@/components/ui/label"

import Text2TextApp_ from "@/../public/apps/t2t.svg"

export default function TestSVGPage() {
  return (
    <Container orientation={"vertical"}>
      <Label>V2AGI</Label>
      <V2AGIBrand className={"h-10"} />

      <Label>Text - Text</Label>
      <Text2TextApp_ />

      <Label>Text - Image</Label>
      {/*<Text2ImageApp />*/}
    </Container>
  )
}
