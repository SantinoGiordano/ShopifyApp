"use client";

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useCartStore } from "@/store/cartStore";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutPage = ({ totalPrice }: { totalPrice: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useCartStore((state) => state.cart);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(""); // ✅ Email state

  // Fetch Payment Intent
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(totalPrice) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  // Handle payment submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("User email entered:", email, "Cart items:", cart);

    if (!stripe || !elements) return;

    localStorage.setItem("checkoutEmail", email);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
        receipt_email: email,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  if (!stripe || !clientSecret || !elements) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* ✅ Email Input */}
        <label className="block mb-4">
          <span className="text-gray-700">Email Address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </label>

        {/* Stripe Payment Element */}
        {clientSecret && <PaymentElement />}

        {/* Error */}
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}

        {/* Submit Button */}
        <button
          disabled={!stripe || isLoading}
          className="bg-black text-white w-full p-5 mt-2 disabled:opacity-50 disabled:animate-pulse hover:cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 rounded-lg shadow-md hover:bg-gray-800"
        >
          {!isLoading ? `Pay $${totalPrice}` : "Processing..."}
        </button>
      </form>
    </>
  );
};

export default CheckoutPage;
