import { db } from "@/server/db"

const initUsers = async () => {
  const res = await db.user.deleteMany()
  console.log({ res })
}

void initUsers()
