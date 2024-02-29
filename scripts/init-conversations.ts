import { db } from "@/server/db"

const initConversations = async () => {
  const res = await db.conversation.deleteMany()
  console.log({ res })
}

void initConversations()
