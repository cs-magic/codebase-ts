"use client"
import { FlexContainer } from "@cs-magic/react-ui"
import { Label } from "@cs-magic/react-ui"
import { Provider } from "jotai"
import { ScopeProvider } from "jotai-scope"
import { PlainContext } from "../plain-context"
import { base1Atom, base2Atom } from "../store"

export default function ScopeProvidersPage() {
  return (
    <Provider>
      <FlexContainer orientation={"vertical"}>
        <Label>Scoped Providers 2</Label>

        <Provider>
          <Label>Base Provider</Label>
          <PlainContext />
        </Provider>

        <ScopeProvider atoms={[base1Atom]}>
          <Label>Scope Provider (p1)</Label>
          <PlainContext />
        </ScopeProvider>

        <ScopeProvider atoms={[base2Atom]}>
          <Label>Scope Provider (p2)</Label>
          <PlainContext />
        </ScopeProvider>

        <ScopeProvider atoms={[base1Atom, base2Atom]}>
          <Label>Scope Provider (p1, p2)</Label>
          <PlainContext />
        </ScopeProvider>

        <Label>Plain</Label>
        <PlainContext />
      </FlexContainer>
    </Provider>
  )
}
