"use client";

import { useEffect } from "react";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "@/store/cartStore";
import CheckoutPage from "@/app/components/CheckoutPage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout() {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const calculateTotalPrice = useCartStore((state) => state.calculateTotalPrice);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    calculateTotalPrice(cart);
  }, [calculateTotalPrice, cart]);

  const isValidAmount = totalPrice > 0;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        
        {isValidAmount ? (
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(totalPrice),
              currency: "usd",
            }}
          >
            <CheckoutPage cart={cart} totalPrice={totalPrice} />
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
