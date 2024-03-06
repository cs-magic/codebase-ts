import { Prisma } from "@prisma/client"
import { modelViewSchema } from "./model"
import { userListViewSchema } from "./user.base"

export const appDetailSchema = Prisma.validator<Prisma.AppDefaultArgs>()({
  include: {
    fromUser: userListViewSchema,
    model: modelViewSchema, // model虽然在系统里已经事先获取了一份，但可能不全
  },
})
export type IAppDetail = Prisma.AppGetPayload<typeof appDetailSchema>