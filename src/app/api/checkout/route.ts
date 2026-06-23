import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();

    // Stripe integration placeholder
    // In production, replace with actual Stripe checkout session creation:
    //
    // import Stripe from 'stripe';
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    //
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [{
    //     price: planId === 'pro' ? process.env.STRIPE_PRO_PRICE_ID : process.env.STRIPE_PREMIUM_PRICE_ID,
    //     quantity: 1,
    //   }],
    //   mode: 'payment',
    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?cancelled=true`,
    // });
    //
    // return NextResponse.json({ url: session.url });

    // Mock response for development
    return NextResponse.json({
      url: `/dashboard?mock_payment=success&plan=${planId}`,
      message: "Stripe not configured. Set STRIPE_SECRET_KEY to enable payments.",
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
