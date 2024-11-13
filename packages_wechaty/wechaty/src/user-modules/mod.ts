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
import { wechatifyUserModule } from "src/user-mixins/wechatify"

import { ContactSelfConstructor, ContactSelfImpl, ContactSelfInterface } from "src/user-modules/contact-self"
import { ContactConstructor, ContactImpl, ContactInterface } from "src/user-modules/contact"
import { DelayConstructor, DelayImpl, DelayInterface } from "src/user-modules/delay"
import { FavoriteConstructor, FavoriteImpl, FavoriteInterface } from "src/user-modules/favorite"
import { FriendshipConstructor, FriendshipImpl, FriendshipInterface } from "src/user-modules/friendship"
import { ImageConstructor, ImageImpl, ImageInterface } from "src/user-modules/image"
import { LocationConstructor, LocationImpl, LocationInterface } from "src/user-modules/location"
import { MessageConstructor, MessageImpl, MessageInterface } from "src/user-modules/message"
import { MiniProgramConstructor, MiniProgramImpl, MiniProgramInterface } from "src/user-modules/mini-program"
import { MomentConstructor, MomentImpl, MomentInterface } from "src/user-modules/moment"
import { MoneyConstructor, MoneyImpl, MoneyInterface } from "src/user-modules/money"
import { PostConstructor, PostImpl, PostInterface } from "src/user-modules/post"
import { RoomInvitationConstructor, RoomInvitationImpl, RoomInvitationInterface } from "src/user-modules/room-invitation"
import { RoomConstructor, RoomImpl, RoomInterface } from "src/user-modules/room"
import { TagConstructor, TagImpl, TagInterface } from "src/user-modules/tag"
import { UrlLinkConstructor, UrlLinkImpl, UrlLinkInterface } from "src/user-modules/url-link"

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
