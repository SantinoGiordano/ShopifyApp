// /app/checkout/page.tsx
"use client";

import { useEffect } from "react";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useCartStore } from "@/store/cartStore";
import CheckoutPage from "@/app/components/CheckoutPage";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const calculateTotalPrice = useCartStore(
    (state) => state.calculateTotalPrice
  );
  const cart = useCartStore((state) => state.cart);

useEffect(() => {
  calculateTotalPrice(cart);
}, [cart]);

  const isValidAmount = totalPrice > 0;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>
        {isValidAmount ? (
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(totalPrice),
              currency: "usd",
            }}
          >
            <CheckoutPage totalPrice={totalPrice} />
          </Elements>
        ) : (
          <p className="text-center text-red-500">
            Add items to cart to checkout
          </p>
        )}
      </div>
    </main>
  );
}
