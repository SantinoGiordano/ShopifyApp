// /app/cart/page.tsx
"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCartStore();

  const total = cart.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.map((item) => (
        <div key={item._id} className="mb-4 flex justify-between items-center">
          <div>
            <h2>{item.name}</h2>
            <p>${(item.price / 100).toFixed(2)}</p>
          </div>
          <button onClick={() => removeFromCart(item._id)}>❌</button>
        </div>
      ))}
      <div className="mt-4 font-bold">Total: ${(total / 100).toFixed(2)}</div>
      <Link href="/checkout">
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Checkout
        </button>
      </Link>
    </div>
  );
}
