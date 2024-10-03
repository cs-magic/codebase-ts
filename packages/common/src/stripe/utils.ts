import { getServerId } from "../router";

export interface IClientReferenceId {
  userId: string;
  serverId: number;
}

/**
 * client-reference-id 只支持常规字符（数字、字母、-、_），@see: https://stripe.com/docs/payments/checkout/pricing-table#handle-fulfillment-with-the-stripe-api
 * @param userId
 */
export const encodeClientReferenceId = (userId: string) =>
  `${getServerId()}__${userId}`;

export const decodeClientReferenceId = (v: string): IClientReferenceId => {
  const [origin, userId] = v.split("__");
  return { serverId: parseInt(origin!), userId: userId! };
};
export function formatAmountForDisplay(
  amount: number,
  currency: string,
): string {
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });
  return numberFormat.format(amount);
}

export function formatAmountForStripe(
  amount: number,
  currency: string,
): number {
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (const part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
