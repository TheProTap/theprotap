import { loadStripe } from "@stripe/stripe-js"

// This will be replaced with your actual Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

export default stripePromise
