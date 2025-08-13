"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCartStore();

  const total = cart.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-center font-extrabold text-gray-900 mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p className=" text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow"
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">{item.name}</h2>
                    <p className="text-black">${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 text-xl transition-colors"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 text-black flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout">
              <button className="mt-6 w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md">
                Proceed to Checkout
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
