/**
 * We must import `instance-of.js` first, to prevent the following error:
 *
 *  ReferenceError: Cannot access 'Puppet' before initialization
 *   at file:///home2/huan/git/wechaty/puppet/src/puppet/interface-of.ts:14:48
 */
import "src/puppet/interface-of"
import { resolvePuppet } from "src/puppet/puppet-resolver"

export { resolvePuppet }
