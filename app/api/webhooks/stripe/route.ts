import { NextResponse } from "next/server"
import { headers } from "next/headers"
import stripe from "@/lib/stripe-server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get("stripe-signature") as string

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "")
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object

      // Update the order status
      const { error } = await supabase
        .from("orders")
        .update({
          status: "processing",
          stripe_payment_intent_id: session.payment_intent,
          shipping_address: session.shipping
            ? {
                name: session.shipping.name,
                address: {
                  line1: session.shipping.address.line1,
                  line2: session.shipping.address.line2,
                  city: session.shipping.address.city,
                  state: session.shipping.address.state,
                  postal_code: session.shipping.address.postal_code,
                  country: session.shipping.address.country,
                },
              }
            : {},
        })
        .eq("stripe_checkout_session_id", session.id)

      if (error) {
        console.error("Error updating order:", error)
      }

      // Create a card for the user
      const { metadata } = session

      for (let i = 0; i < metadata.quantity; i++) {
        await supabase.from("cards").insert({
          user_id: metadata.userId,
          card_type: metadata.cardType,
          card_color: metadata.cardColor,
          card_style: metadata.cardStyle,
          nfc_id: `NFC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        })
      }

      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
