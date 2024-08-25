import type { GErrorMixin, ProtectedPropertyGErrorMixin } from "./gerror-mixin.js"
import { gErrorMixin } from "./gerror-mixin.js"
import type { IoMixin, ProtectedPropertyIoMixin } from "./io-mixin.js"
import { ioMixin } from "./io-mixin.js"
import type { LoginMixin, ProtectedPropertyLoginMixin } from "./login-mixin.js"
import { loginMixin } from "./login-mixin.js"
import type { MiscMixin, ProtectedPropertyMiscMixin } from "./misc-mixin.js"
import { miscMixin } from "./misc-mixin.js"
import type { PluginMixin, ProtectedPropertyPluginMixin } from "./plugin-mixin.js"
import { pluginMixin } from "./plugin-mixin.js"
import type { ProtectedPropertyPuppetMixin, PuppetMixin } from "./puppet-mixin.js"
import { puppetMixin } from "./puppet-mixin.js"
import type {
  ProtectedPropertyWechatifyUserModuleMixin,
  WechatifyUserModuleMixin,
} from "./wechatify-user-module-mixin.js"
import { wechatifyUserModuleMixin } from "./wechatify-user-module-mixin.js"

type WechatyMixinProtectedProperty =
  | ProtectedPropertyGErrorMixin
  | ProtectedPropertyIoMixin
  | ProtectedPropertyLoginMixin
  | ProtectedPropertyMiscMixin
  | ProtectedPropertyPluginMixin
  | ProtectedPropertyPuppetMixin
  | ProtectedPropertyWechatifyUserModuleMixin

export type {
  GErrorMixin,
  IoMixin,
  LoginMixin,
  MiscMixin,
  PluginMixin,
  PuppetMixin,
  WechatifyUserModuleMixin,
  WechatyMixinProtectedProperty,
}
export { gErrorMixin, ioMixin, loginMixin, miscMixin, pluginMixin, puppetMixin, wechatifyUserModuleMixin }
