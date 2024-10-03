import { StripeSubscriptionLevel } from "@prisma/client";

export const subscriptionLevel2Unit: Record<StripeSubscriptionLevel, number> = {
  basic: 1,
  premium: 2,
  extreme: 3,
};
