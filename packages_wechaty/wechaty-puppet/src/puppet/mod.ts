/**
 * Huan(202110): Issue #168 - ReferenceError: Cannot access 'Puppet' before initialization
 *  @see https://github.com/wechaty/puppet/issues/168
 *
 * We need to import `interface-of.js` before import `puppet-abstract.js`
 *  or we will get the following error message:
 *
 * ReferenceError: Cannot access 'Puppet' before initialization
 at file:///home2/huan/git/wechaty/puppet/src/puppet/interface-of.ts:23:48
 at ModuleJob.run (node:internal/modules/esm/module_job:175:25)
 at async Loader.import (node:internal/modules/esm/loader:178:24)
 at async Object.loadESM (node:internal/process/esm_loader:68:5)

 * This is due to the circler dependence, the deeper reason is still not clear.
 */
import "src/puppet/interface-of"
import { Puppet } from "src/puppet/puppet-abstract"
import type { PuppetConstructor, PuppetInterface } from "src/puppet/puppet-interface"
import { resolvePuppet } from "src/puppet/puppet-resolver"
import { PuppetSkeleton } from "src/puppet/puppet-skeleton"

export type { PuppetConstructor, PuppetInterface }
export { Puppet, PuppetSkeleton, resolvePuppet }
