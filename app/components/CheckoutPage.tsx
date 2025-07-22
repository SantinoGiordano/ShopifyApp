"use client";

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutPage = ({ totalPrice }: { totalPrice: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) {
      return;
    }
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
        // return_url: window.location.origin,
        return_url: `${window.location.origin}/success`,
      },
    })
    
    if( error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }

  };


  if (!stripe || !clientSecret || !elements) {
    return <span className="loading loading-spinner loading-lg"></span>
  }


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {clientSecret && <PaymentElement />}

        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
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
