"use client";

import { useEffect, useState, useRef } from "react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/types";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div
        className="hidden md:block w-full min-h-[500px] items-center justify-center 
        bg-[url('/beachSunset.jpg')] bg-cover bg-center bg-no-repeat bg-fixed"
      ></div>

      <div className="min-h-screen bg-blue-400 md:bg-gradient-to-r md:from-blue-400 md:to-purple-400 flex flex-col items-center py-12">
        <h1 className="text-3xl font-bold mb-10 text-white">Our Products</h1>

        {loading ? (
          <span className="loading loading-spinner loading-xl text-white"></span>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
            {products.length > 0 ? (
              products.map((product) => (
                <AudioCard
                  key={product._id}
                  id={product._id}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  file={product.file}
                />
              ))
            ) : (
              <p className="text-white text-lg">No products found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

type AudioCardProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  file: string;
};

const AudioCard = ({ id, title, description, price, file }: AudioCardProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { isInCart, toggleCartItem, cartLength } = useCartStore();
  const inCart = isInCart(id);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl border-t-4 border-blue-400">
      {/* Audio Button */}
      <div className="w-24 h-24 bg-purple-400 md:bg-gradient-to-r md:from-blue-400 md:to-purple-400 rounded-full flex items-center justify-center mb-4 shadow-md relative">
        <button
          onClick={toggleAudio}
          className="text-white p-2 rounded-full transition-all duration-200 hover:scale-110 absolute"
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12"
            >
              <path
                fillRule="evenodd"
                d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2 text-blue-700">{title}</h2>
      <p className="text-gray-600 text-center mb-4">{description}</p>
      <p className="text-gray-800 font-medium mb-4">${price.toFixed(2)}</p>

      <audio
        ref={audioRef}
        src={file}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <button
        onClick={() => {
          toggleCartItem({ _id: id, name: title, price, file, description });
        }}
        className={`p-3 mt-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg ${
          inCart
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {inCart ? "Remove from Cart" : "Add to Cart"}
      </button>

      {cartLength >= 1 && (
        <p className="mt-2 text-blue-700 font-semibold cursor-pointer hover:underline">
          <Link href="/checkout">Proceed to Checkout</Link>
        </p>
      )}
    </div>
  );
};
