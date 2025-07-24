"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function SuccessPage() {
  const cart = useCartStore(state => state.cart);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only in browser
    const storedEmail = localStorage.getItem("checkoutEmail");
    setEmail(storedEmail);

    if (storedEmail && cart.length > 0) {
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: storedEmail, cart }),
      });
    }
  }, [cart]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
      <p>We've sent your details to our team.</p>
    </div>
  );
}
