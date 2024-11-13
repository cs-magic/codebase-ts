/**
 *   Wechaty - https://github.com/wechaty/wechaty
 *
 *   @copyright 2016-2018 Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

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
import { VERSION, log } from "src/config"
import "src/puppet/interface-of"
import { Puppet } from "src/puppet/puppet-abstract"
import type { PuppetOptions } from "src/schemas/puppet"
import { throwUnsupportedError } from "src/throw-unsupported-error"

export type { PuppetOptions }
export { log, Puppet, throwUnsupportedError, VERSION }

export * as filters from "src/mods/filters"
export * as helpers from "src/mods/helpers"
export * as impls from "src/mods/impls"
export * as payloads from "src/mods/payloads"
export * as types from "src/mods/types"

export * from "src/extra"
