import { z } from "zod"
import { pusherServerIdSchema } from "@/lib/puser/config"

export const createMessageSchema = z.object({
  pusherServerId: pusherServerIdSchema.optional(),
  id: z.string().nullable(),
  text: z.string(),
})
