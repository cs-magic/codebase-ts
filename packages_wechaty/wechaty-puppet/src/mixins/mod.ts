import { ProtectedPropertySayableMixin, sayableMixin } from "src/mixins/sayable-mixin"

import { ProtectedPropertyCacheMixin, cacheMixin } from "src/mixins/cache-mixin"
import { ProtectedPropertyContactMixin, contactMixin } from "src/mixins/contact-mixin"
import { ProtectedPropertyFriendshipMixin, friendshipMixin } from "src/mixins/friendship-mixin"
import { ProtectedPropertyLoginMixin, loginMixin } from "src/mixins/login-mixin"
import { ProtectedPropertyMemoryMixin, memoryMixin } from "src/mixins/memory-mixin"
import { ProtectedPropertyMessageMixin, messageMixin } from "src/mixins/message-mixin"
import { miscMixin } from "src/mixins/misc-mixin"
import { ProtectedPropertyPostMixin, postMixin } from "src/mixins/post-mixin"
import { readyMixin } from "src/mixins/ready-mixin"
import { ProtectedPropertyRoomInvitationMixin, roomInvitationMixin } from "src/mixins/room-invitation-mixin"
import { ProtectedPropertyRoomMemberMixin, roomMemberMixin } from "src/mixins/room-member-mixin"
import { ProtectedPropertyRoomMixin, roomMixin } from "src/mixins/room-mixin"
import { ProtectedPropertyServiceMixin, serviceMixin } from "src/mixins/service-mixin"
import { ProtectedPropertyTagMixin, tagMixin } from "src/mixins/tag-mixin"
import { ProtectedPropertyTapMixin, tapMixin } from "src/mixins/tap-mixin"
import { ProtectedPropertyValidateMixin, validateMixin } from "src/mixins/validate-mixin"

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
