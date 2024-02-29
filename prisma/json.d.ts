declare global {
  // 要放在里面
  import { ConversationType } from "@/schema/db"

  namespace PrismaJson {
    type ConversationType = ConversationType
  }
}
