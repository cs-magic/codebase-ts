import { type Prisma } from "@prisma/client"
import { prisma } from "../../../packages-to-classify/db/providers/prisma"

export const getConvTable = (
  isRoom: boolean,
): Prisma.WechatUserDelegate & Prisma.WechatRoomDelegate =>
  prisma[isRoom ? "wechatRoom" : "wechatUser"] as Prisma.WechatUserDelegate &
    Prisma.WechatRoomDelegate