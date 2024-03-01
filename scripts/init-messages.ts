import { db } from "@/server/db"

const initMessages = async () => {
  const res = await db.message.deleteMany()
  console.log({ res })
}

void initMessages()
