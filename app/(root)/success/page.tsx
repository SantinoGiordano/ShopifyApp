"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function SuccessPage() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [, setEmail] = useState<string | null>(null);
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
  <div className="flex flex-col items-center justify-center h-screen text-center space-y-4 bg-blue-400 md:bg-gradient-to-r md:from-blue-400 md:to-purple-400">
    <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
      Payment Successful!
    </h1>
    <p className="text-lg text-white/90">
      We&apos;ve sent your details to our team.
    </p>
  </div>
);

}
