import type { Constructor } from "clone-class"
import type { EventEmitter } from "events"

import type { WechatyEventListeners } from "src/schemas/mod"
import { validationMixin } from "src/user-mixins/mod"
import type { WechatyMixinProtectedProperty } from "src/wechaty-mixins/mod"

import { WechatyBase, WechatyBaseProtectedProperty } from "src/wechaty/wechaty-base"
import type { WechatySkeletonProtectedProperty } from "src/wechaty/wechaty-skeleton"

/**
 * Huan(202111): this is for solving the circyle dependency problem
 *
 *  Construct a `WechatyImpl` based the `WechatyImplBase` with `validationMixin`
 *
 */
class WechatyImplBase extends validationMixin(WechatyBase)<WechatyImplInterface>() {}
interface WechatyImplInterface extends WechatyImplBase {}

class WechatyImpl extends validationMixin(WechatyImplBase)<WechatyInterface>() {}

/**
 * ^ The above code will make a ready-to-use class: `WechatyImpl`
 *  without any cyclic dependency problem.
 */

type AllProtectedProperty =
  | keyof EventEmitter // Huan(202110): remove all EventEmitter first, and added typed event emitter later: or will get error
  | WechatyMixinProtectedProperty
  | WechatyBaseProtectedProperty
  | WechatySkeletonProtectedProperty
  | `_${string}` // remove all property from interface which is start with `_`

/**
 * Huan(202111):
 * `on`/`off`/`once` must use TypedEventEmitter<WechatyEventListeners> instead of WechatyImpl
 *    or will run into error: cyclic dependency?
 */
interface WechatyEventEmitter {
  on: <E extends keyof WechatyEventListeners>(event: E, listener: WechatyEventListeners[E]) => WechatyInterface
  off: <E extends keyof WechatyEventListeners>(event: E, listener: WechatyEventListeners[E]) => WechatyInterface
  once: <E extends keyof WechatyEventListeners>(event: E, listener: WechatyEventListeners[E]) => WechatyInterface
}

type WechatyInterface = Omit<WechatyImplInterface, AllProtectedProperty> & WechatyEventEmitter

type WechatyConstructor = Constructor<WechatyInterface, typeof WechatyImpl>

export { type WechatyInterface, type WechatyConstructor, type AllProtectedProperty, WechatyImpl }
