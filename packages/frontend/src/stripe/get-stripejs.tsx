import { type Stripe, loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "src/stripe/config";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
