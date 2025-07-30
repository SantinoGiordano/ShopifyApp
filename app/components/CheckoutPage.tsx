"use client";

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/types";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutPage = ({
  totalPrice,
}: {
  totalPrice: number;
  cart: Product[];
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useCartStore((state) => state.cart);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubcurrency(totalPrice) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

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
    <div className=" py-6 px-4 sm:px-6 md:px-8 w-full">
      <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 text-center">
          Checkout
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-black p-2 sm:p-3 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          {clientSecret && <PaymentElement className="mt-4" />}

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          <button
            disabled={!stripe || isLoading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50 shadow-md text-base sm:text-lg"
          >
            {!isLoading ? `Pay $${totalPrice.toFixed(2)}` : "Processing..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
