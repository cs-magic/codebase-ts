import { Constructor, interfaceOfClass, looseInstanceOfClass } from "clone-class"

import { Puppet } from "src/puppet/puppet-abstract"
import type { PuppetInterface } from "src/puppet/puppet-interface"

const interfaceOfPuppet = interfaceOfClass(Puppet as any as Constructor<Puppet>)<PuppetInterface>()
const looseInstanceOfPuppet = looseInstanceOfClass(Puppet as any as Constructor<Puppet>)

export { interfaceOfPuppet, looseInstanceOfPuppet }
