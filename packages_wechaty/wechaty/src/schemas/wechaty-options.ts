import type { MemoryCard } from "memory-card"
import type * as PUPPET from "packages_wechaty/wechaty-puppet/src/mods/mod"

import type { OfficialPuppetNpmName } from "src/puppet-config"

interface OptionsPuppetInstance {
  puppet?: PUPPET.impls.PuppetInterface
}

interface OptionsPuppetName {
  puppet?: OfficialPuppetNpmName
  puppetOptions?: PUPPET.PuppetOptions
}

interface WechatyOptionsBase {
  memory?: MemoryCard
  name?: string
  ioToken?: string
}

type WechatyOptionsPuppetInstance = WechatyOptionsBase & OptionsPuppetInstance

type WechatyOptionsPuppetName = WechatyOptionsBase & OptionsPuppetName

type WechatyOptions = WechatyOptionsPuppetInstance | WechatyOptionsPuppetName

export { type WechatyOptions, type WechatyOptionsPuppetName }
