import { StripeSubscriptionLevel, Prisma } from "@prisma/client";

export const subscriptionLevel2Unit: Record<StripeSubscriptionLevel, number> = {
  basic: 1,
  premium: 2,
  extreme: 3,
};
/// ///////////////////////////////////////////////////
// stripe
/// ///////////////////////////////////////////////////
export const CURRENCY = "usd";

export const STRIPE_PRICING_TABLE_ID = "prctbl_1NiZjCHb6cJdkB4p6robW7m2"; // 人民币版本（已完善）
// export const STRIPE_PRICING_TABLE_ID = “prctbl_1NifItHb6cJdkB4pTEPLvStl” // 美元版本（还未完善）
export const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51N0prGHb6cJdkB4pSlnkbhd0ZQTSHdePHA0rJN29ZpiZdQRf8PYJYvqc4CMIP85it2Jws5uvbU0CcZOjGGBm9vLj00JB8RUMHw";
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
export const MIN_AMOUNT = 10.0;
export const MAX_AMOUNT = 5000.0;
export const AMOUNT_STEP = 5.0;
export const STRIPE_SUBSCRIBE_PRODUCT_10_ID = "prod_OVgYAVpLO6oLje";
// products list, ref: https://dashboard.stripe.com/products?active=true
export const paymentProducts: Prisma.StripeProductUncheckedCreateInput[] = [
  { id: "prod_OVgbKpNEmJJXIy", price: 10, currency: "USD", mode: "payment" },
  {
    id: "prod_OVgYAVpLO6oLje",
    price: 9.99,
    currency: "USD",
    mode: "subscription",
    level: "premium",
    expire: 30,
  },
  {
    id: "prod_OVgZnKD7Fc2bsQ",
    price: 29.99,
    currency: "USD",
    mode: "subscription",
    level: "extreme",
    expire: 30,
  },

  { id: "prod_OOeVuH6LpHINCO", price: 9.99, currency: "CNY", mode: "payment" },
  {
    id: "prod_OOeF8lXiDVIMlS",
    price: 9.99,
    currency: "CNY",
    mode: "subscription",
    level: "basic",
    expire: 30,
  },
  {
    id: "prod_OOeH04oe1Sm67z",
    price: 29.99,
    currency: "CNY",
    mode: "subscription",
    level: "premium",
    expire: 30,
  },
  {
    id: "prod_OOeIvw7nucInBz",
    price: 49.99,
    currency: "CNY",
    mode: "subscription",
    level: "extreme",
    expire: 30,
  },
];
