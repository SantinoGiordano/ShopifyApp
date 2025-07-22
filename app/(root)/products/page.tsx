// /app/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/types";



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { toggleCartItem, isInCart } = useCartStore();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product: Product) => {
        const inCart = isInCart(product._id);
        return (
          <div
            key={product._id}
            className="bg-white p-4 shadow rounded-lg flex flex-col"
          >
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="mb-2">${(product.price).toFixed(2)}</p>
            <button
              onClick={() => toggleCartItem(product)}
              className={`px-4 py-2 rounded-lg text-white font-semibold ${
                inCart ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
