import { sendSmsSchema } from "@/schema/sms"
import { sendSms } from "@/server/sms"
import { createTRPCRouter, publicProcedure } from "@/server/trpc-helpers"

export const authRouter = createTRPCRouter({
  sendSms: publicProcedure.input(sendSmsSchema).mutation(({ ctx, input }) => sendSms(input.phone)),
})
