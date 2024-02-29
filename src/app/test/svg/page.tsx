"use client"

import { Container } from "@/components/containers"
import { Text2ImageAppSVG, Text2TextAppSVG, V2AGIBrand } from "@/config/assets"
import { Label } from "@/components/ui/label"

export default function TestSVGPage() {
  return (
    <Container orientation={"vertical"}>
      <Label>V2AGI</Label>
      <V2AGIBrand x className={"h-12"} />

      <Label>Text - Text</Label>
      <Text2TextAppSVG
        className={"h-24 border border-white"}
        // viewBox={"40 40 220 220"}
      />

      <Label>Text - Image</Label>
      <Text2ImageAppSVG
        className={"h-24 border border-white"}
        viewBox={"40 40 220 220"}
      />
    </Container>
  )
}
