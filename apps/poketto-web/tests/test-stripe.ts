import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-08-16",
  appInfo: {
    name: "poketto.ai",
    url: "https://poketto.ai",
  },
})

const testRetrieveProductInfo = async () => {
  const sessionId = "cs_live_a1YQHKcPto6mgzEkX77kRZjRmb4ZaJjyqbEeL80a0xmJPXxZXp8WXRmwB2"
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)
  console.log({ lineItems })
  for (const item of lineItems.data) {
    const productID = item.price?.product as string // get the product ID
    const { quantity } = item // get the quantity

    console.log({ productID, quantity })
  }
}

void testRetrieveProductInfo()
