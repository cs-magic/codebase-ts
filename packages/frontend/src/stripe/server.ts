import "server-only";
import Stripe from "stripe";

if (!process.env.STRIPE_API_KEY) throw new Error("no stripe api key");

export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-08-16",
  appInfo: {
    name: "poketto.ai",
    url: "https://poketto.ai",
    version: "0.1.0",
  },
});
