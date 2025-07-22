"use client";

import { useEffect, useState } from "react";

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cartStore";

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, totalPrice } = useCartStore(); // or get cartItems from state
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      },
      redirect: "if_required", // optional depending on your flow
    });

    if (error) {
      setMessage(error.message ?? "Payment failed.");
    } else {
      setMessage("✅ Payment succeeded!");

      // ✅ Send email with product info
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: cart,
          totalPrice: totalPrice,
        }),
      });

      console.log("✅ Email sent with purchase info");
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe || !elements}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
        >
          Pay Now
        </button>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default CheckoutPage;
