"use server"
import { db } from "../../../../../packages/common/lib/db"

export const updateUserNameViaTrpc = async (userId: string, name: string) => {
  await db.user.update({ where: { id: userId }, data: { name } })
}