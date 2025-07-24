import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, cart } = await req.json();

    // Create transporter (using Gmail as example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // app-specific password
      },
    });

    // Format cart items
    const cartDetails = cart
      .map((item: any) => `${item.name} - $${item.price}`)
      .join("\n");

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "santinogiordano13@gmail.com", // YOUR email
      subject: `New Checkout from ${email}`,
      text: `Customer Email: ${email}\n\nCart Items:\n${cartDetails}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
