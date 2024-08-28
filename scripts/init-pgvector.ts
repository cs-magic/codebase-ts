import { ChatMessage, Prisma, PrismaClient } from "@prisma/client"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { PrismaVectorStore } from "langchain/vectorstores/prisma"

export const run = async () => {
  const db = new PrismaClient()

  console.log("init vector store")
  const vectorStore = PrismaVectorStore.withModel<ChatMessage>(db).create(new OpenAIEmbeddings(), {
    prisma: Prisma,
    tableName: "ChatMessage",
    vectorColumnName: "vector",
    columns: {
      id: PrismaVectorStore.IdColumn,
      content: PrismaVectorStore.ContentColumn,
      role: PrismaVectorStore.ContentColumn,
    },
  })

  console.log("creating vectors")
  await vectorStore.addModels(await db.chatMessage.findMany())

  console.log("finding...")
  const result = await vectorStore.similaritySearch("MarkShawn2020", 3)
  console.log(result)
}

void run()
