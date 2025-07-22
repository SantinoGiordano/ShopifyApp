import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { products, totalPrice } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlProducts = products.map((item: any) => `
      <li><strong>${item.name}</strong> — $${item.price} (ID: ${item.id})</li>
    `).join("");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "santinogiordano13@gmail.com",
      subject: "🛒 New Purchase Made",
      html: `
        <h2>🛍️ New Payment Received</h2>
        <p><strong>Total:</strong> $${totalPrice}</p>
        <ul>${htmlProducts}</ul>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return NextResponse.json({ error: "Email failed to send" }, { status: 500 });
  }
}
