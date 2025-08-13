import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
   apiVersion: "2025-06-30.basil",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { cart, email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  try {
    // 1. Create customer
    const customer = await stripe.customers.create({ email });

    // 2. Add invoice items
    for (const item of cart) {
      await stripe.invoiceItems.create({
        customer: customer.id,
        amount: Math.round(item.price * 100), // always round to avoid floating-point issues
        currency: "usd",
        description: item.name,
      });
    }

    // 3. Create and finalize invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: false,
    });

    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    res.status(200).json({ invoicePdf: finalizedInvoice.invoice_pdf });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
}
