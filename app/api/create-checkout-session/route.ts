import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
})

export async function POST(req: NextRequest) {
  try {
    const { priceId, trialPeriodDays } = await req.json()

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: trialPeriodDays,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/app`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/subscription`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error)
    return NextResponse.json({ error: "Erro ao criar sessão de checkout" }, { status: 500 })
  }
}
