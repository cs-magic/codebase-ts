import { getServerId } from "@/lib/router"

export interface IClientReferenceId {
  userId: string
  serverId: number
}

/**
 * client-reference-id 只支持常规字符（数字、字母、-、_），@see: https://stripe.com/docs/payments/checkout/pricing-table#handle-fulfillment-with-the-stripe-api
 * @param userId
 */
export const encodeClientReferenceId = (userId: string) => `${getServerId()}__${userId}`

export const decodeClientReferenceId = (v: string): IClientReferenceId => {
  const [origin, userId] = v.split("__")
  return { serverId: parseInt(origin!), userId: userId! }
}
