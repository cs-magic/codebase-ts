import type { Constructor } from "clone-class"

import type { MixinProtectedProperty } from "src/mixins/mod"

import type { Puppet } from "src/puppet/puppet-abstract"
import type { PuppetSkeletonProtectedProperty } from "src/puppet/puppet-skeleton"

type PuppetProtectedProperty = MixinProtectedProperty | PuppetSkeletonProtectedProperty

// https://stackoverflow.com/questions/44983560/how-to-exclude-a-key-from-an-interface-in-typescript
type PuppetInterface = Omit<Puppet, PuppetProtectedProperty | `_${string}`>

type PuppetConstructor = Constructor<PuppetInterface>

export type { PuppetProtectedProperty, PuppetConstructor, PuppetInterface }
