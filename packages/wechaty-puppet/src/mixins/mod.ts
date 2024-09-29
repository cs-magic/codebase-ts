import { ProtectedPropertySayableMixin, sayableMixin } from "../mixins/sayable-mixin.js"

import { ProtectedPropertyCacheMixin, cacheMixin } from "./cache-mixin.js"
import { ProtectedPropertyContactMixin, contactMixin } from "./contact-mixin.js"
import { ProtectedPropertyFriendshipMixin, friendshipMixin } from "./friendship-mixin.js"
import { ProtectedPropertyLoginMixin, loginMixin } from "./login-mixin.js"
import { ProtectedPropertyMemoryMixin, memoryMixin } from "./memory-mixin.js"
import { ProtectedPropertyMessageMixin, messageMixin } from "./message-mixin.js"
import { miscMixin } from "./misc-mixin.js"
import { ProtectedPropertyPostMixin, postMixin } from "./post-mixin.js"
import { readyMixin } from "./ready-mixin.js"
import { ProtectedPropertyRoomInvitationMixin, roomInvitationMixin } from "./room-invitation-mixin.js"
import { ProtectedPropertyRoomMemberMixin, roomMemberMixin } from "./room-member-mixin.js"
import { ProtectedPropertyRoomMixin, roomMixin } from "./room-mixin.js"
import { ProtectedPropertyServiceMixin, serviceMixin } from "./service-mixin.js"
import { ProtectedPropertyTagMixin, tagMixin } from "./tag-mixin.js"
import { ProtectedPropertyTapMixin, tapMixin } from "./tap-mixin.js"
import { ProtectedPropertyValidateMixin, validateMixin } from "./validate-mixin.js"

/**
 * Issue #155 - Mixin: Property 'messageRawPayload' of exported class expression
 *  may not be private or protected.ts(4094)
 *  @see https://github.com/wechaty/puppet/issues/155
 *
 * We can not use `private` or `protected` to declare Mixins
 *  So we define a `ProtectedMethods` list to mark the protected methods
 *    And Omit them from the Puppet typing defination
 *    to build a new PuppetInterface
 */
type MixinProtectedProperty =
  | ProtectedPropertyCacheMixin
  | ProtectedPropertyContactMixin
  | ProtectedPropertyFriendshipMixin
  | ProtectedPropertyLoginMixin
  | ProtectedPropertyMemoryMixin
  | ProtectedPropertyMessageMixin
  | ProtectedPropertyPostMixin
  | ProtectedPropertyRoomInvitationMixin
  | ProtectedPropertyRoomMemberMixin
  | ProtectedPropertyRoomMixin
  | ProtectedPropertyServiceMixin
  | ProtectedPropertyTagMixin
  | ProtectedPropertyTapMixin
  | ProtectedPropertySayableMixin
  | ProtectedPropertyValidateMixin

export {
  type MixinProtectedProperty,
  cacheMixin,
  contactMixin,
  friendshipMixin,
  loginMixin,
  memoryMixin,
  messageMixin,
  miscMixin,
  postMixin,
  readyMixin,
  roomInvitationMixin,
  roomMemberMixin,
  roomMixin,
  serviceMixin,
  tagMixin,
  tapMixin,
  sayableMixin,
  validateMixin,
}
