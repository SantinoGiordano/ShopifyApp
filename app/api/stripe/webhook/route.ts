// /app/api/stripe-webhook/route.ts
import { NextRequest } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const cartJSON = paymentIntent.metadata?.cart;
    let cartItems = [];

    try {
      cartItems = JSON.parse(cartJSON || "[]");
    } catch (err) {
      console.error("Failed to parse cart metadata:", err);
    }

    const productList = cartItems
      .map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) =>
          `• ${item.name} - $${(item.price / 100).toFixed(2)} (ID: ${item._id})`
      )
      .join("\n");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "santinogiordano13@gmail.com",
      subject: "🛒 New Purchase Received",
      text: `A new payment of $${(paymentIntent.amount / 100).toFixed(
        2
      )} was made.\n\nItems:\n${productList}`,
    });

    console.log("✅ Email sent for payment:", paymentIntent.id);
  }

  return new Response("OK", { status: 200 });
}