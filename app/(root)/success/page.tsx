"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function SuccessPage() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [email, setEmail] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Wait until Zustand store is hydrated
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return; 

    const storedEmail = localStorage.getItem("checkoutEmail");
    setEmail(storedEmail);

    console.log("Persisted email on success page:", storedEmail);
    console.log("Persisted cart on success page:", cart);

    if (storedEmail && cart.length > 0) {
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: storedEmail, cart }),
      }).then(() => {
        // Clear cart and email AFTER email send
        clearCart();
        localStorage.removeItem("checkoutEmail");
      });
    }
  }, [hydrated, cart, clearCart]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
      <p>We&apos;ve sent your details to our team.</p>
    </div>
  );
}
