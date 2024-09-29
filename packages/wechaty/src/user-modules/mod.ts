/**
 *   Wechaty Chatbot SDK - https://github.com/wechaty/wechaty
 *
 *   @copyright 2016 Huan LI (李卓桓) <https://github.com/huan>, and
 *                   Wechaty Contributors <https://github.com/wechaty>.
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
import { wechatifyUserModule } from "../user-mixins/wechatify.js"

import { ContactSelfConstructor, ContactSelfImpl, ContactSelfInterface } from "./contact-self.js"
import { ContactConstructor, ContactImpl, ContactInterface } from "./contact.js"
import { DelayConstructor, DelayImpl, DelayInterface } from "./delay.js"
import { FavoriteConstructor, FavoriteImpl, FavoriteInterface } from "./favorite.js"
import { FriendshipConstructor, FriendshipImpl, FriendshipInterface } from "./friendship.js"
import { ImageConstructor, ImageImpl, ImageInterface } from "./image.js"
import { LocationConstructor, LocationImpl, LocationInterface } from "./location.js"
import { MessageConstructor, MessageImpl, MessageInterface } from "./message.js"
import { MiniProgramConstructor, MiniProgramImpl, MiniProgramInterface } from "./mini-program.js"
import { MomentConstructor, MomentImpl, MomentInterface } from "./moment.js"
import { MoneyConstructor, MoneyImpl, MoneyInterface } from "./money.js"
import { PostConstructor, PostImpl, PostInterface } from "./post.js"
import { RoomInvitationConstructor, RoomInvitationImpl, RoomInvitationInterface } from "./room-invitation.js"
import { RoomConstructor, RoomImpl, RoomInterface } from "./room.js"
import { TagConstructor, TagImpl, TagInterface } from "./tag.js"
import { UrlLinkConstructor, UrlLinkImpl, UrlLinkInterface } from "./url-link.js"

export type {
  ContactInterface,
  ContactSelfInterface,
  FavoriteInterface,
  FriendshipInterface,
  ImageInterface,
  LocationInterface,
  MessageInterface,
  MiniProgramInterface,
  MomentInterface,
  MoneyInterface,
  PostInterface,
  RoomInterface,
  RoomInvitationInterface,
  TagInterface,
  DelayInterface,
  UrlLinkInterface,
}

export type {
  ContactConstructor,
  ContactSelfConstructor,
  FavoriteConstructor,
  FriendshipConstructor,
  ImageConstructor,
  LocationConstructor,
  MessageConstructor,
  MiniProgramConstructor,
  MomentConstructor,
  MoneyConstructor,
  PostConstructor,
  RoomConstructor,
  RoomInvitationConstructor,
  DelayConstructor,
  TagConstructor,
  UrlLinkConstructor,
}

export {
  wechatifyUserModule,
  ContactImpl,
  ContactSelfImpl,
  FavoriteImpl,
  FriendshipImpl,
  ImageImpl,
  LocationImpl,
  MessageImpl,
  MiniProgramImpl,
  MomentImpl,
  MoneyImpl,
  PostImpl,
  RoomImpl,
  RoomInvitationImpl,
  DelayImpl,
  TagImpl,
  UrlLinkImpl,
}
