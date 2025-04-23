import { NextResponse } from "next/server"
import stripe from "@/lib/stripe-server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const { cardType, cardColor, cardStyle, quantity, userId } = await request.json()

    // Get product price based on card type
    const unitPrice = cardType === "premium" ? 5000 : 2500 // $50 or $25 in cents

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${cardType.charAt(0).toUpperCase() + cardType.slice(1)} ProTap Card`,
              description: `${cardColor} ${cardStyle} design`,
            },
            unit_amount: unitPrice,
          },
          quantity,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/create-card`,
      metadata: {
        userId,
        cardType,
        cardColor,
        cardStyle,
        quantity,
      },
    })

    // Create a pending order in the database
    const { error } = await supabase.from("orders").insert({
      user_id: userId,
      status: "pending",
      total_amount: (unitPrice * quantity) / 100, // Convert cents to dollars
      shipping_address: {}, // Will be collected by Stripe
      stripe_checkout_session_id: session.id,
    })

    if (error) {
      console.error("Error creating order:", error)
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 })
  }
}
