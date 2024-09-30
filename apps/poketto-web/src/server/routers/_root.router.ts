import { pokettoAppRouter } from "@/server/routers/app.router"
import { authRouter } from "@/server/routers/auth.router"
import { billRouter } from "@/server/routers/bill.router"
import { convRouter } from "@/server/routers/conv.router"
import { feedbackRouter } from "@/server/routers/feedback.router"
import { invitationRouter } from "@/server/routers/invitation.router"
import { msgRouter } from "@/server/routers/msg.router"
import { systemRouter } from "@/server/routers/system.router"
import { userRouter } from "@/server/routers/user.router"
import { createTRPCRouter } from "@/server/trpc-helpers"

export const rootRouter = createTRPCRouter({
  user: userRouter,
  app: pokettoAppRouter,
  conv: convRouter,
  message: msgRouter,
  invitation: invitationRouter,
  bill: billRouter,
  system: systemRouter,
  feedback: feedbackRouter,
  auth: authRouter,
})

export type RootRouter = typeof rootRouter
