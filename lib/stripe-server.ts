import Stripe from "stripe"

// This will be replaced with your actual Stripe secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ""

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
})

export default stripe
