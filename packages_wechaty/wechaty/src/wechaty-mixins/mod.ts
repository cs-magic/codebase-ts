import type { GErrorMixin, ProtectedPropertyGErrorMixin } from "src/wechaty-mixins/gerror-mixin"
import { gErrorMixin } from "src/wechaty-mixins/gerror-mixin"
import type { IoMixin, ProtectedPropertyIoMixin } from "src/wechaty-mixins/io-mixin"
import { ioMixin } from "src/wechaty-mixins/io-mixin"
import type { LoginMixin, ProtectedPropertyLoginMixin } from "src/wechaty-mixins/login-mixin"
import { loginMixin } from "src/wechaty-mixins/login-mixin"
import type { MiscMixin, ProtectedPropertyMiscMixin } from "src/wechaty-mixins/misc-mixin"
import { miscMixin } from "src/wechaty-mixins/misc-mixin"
import type { PluginMixin, ProtectedPropertyPluginMixin } from "src/wechaty-mixins/plugin-mixin"
import { pluginMixin } from "src/wechaty-mixins/plugin-mixin"
import type { ProtectedPropertyPuppetMixin, PuppetMixin } from "src/wechaty-mixins/puppet-mixin"
import { puppetMixin } from "src/wechaty-mixins/puppet-mixin"
import type {
  ProtectedPropertyWechatifyUserModuleMixin,
  WechatifyUserModuleMixin,
} from "src/wechaty-mixins/wechatify-user-module-mixin"
import { wechatifyUserModuleMixin } from "src/wechaty-mixins/wechatify-user-module-mixin"

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
