"use client";

import Link from "next/link";
import React, { useState } from "react";

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="bg-white text-black px-4 py-4 md:px-8 md:py-4 flex justify-between md:justify-center items-center fixed top-0 left-0 w-full z-50 ">
        <button
          className="md:hidden ml-4 focus:outline-none"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"}
            />
          </svg>
        </button>

        <ul className="hidden md:flex space-x-4 p-2 md:space-x-8">
          <li>
            <Link
              href="/"
              className="hover:text-gray-400 transition-colors font-medium text-base md:text-lg "
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-gray-400 transition-colors font-medium text-base md:text-lg "
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-gray-400 transition-colors font-medium text-base md:text-lg "
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className="hover:text-gray-400 transition-colors font-medium text-base md:text-lg "
            >
              🛒 Your Cart
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="text-white fixed inset-0 bg-black z-[9999] flex flex-col items-center pt-24 md:hidden transition-all">
          <button
            className="absolute top-6 right-6"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <Link
            href="/"
            className="block py-3 px-6 text-lg font-medium hover:text-gray-400 drop-shadow"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block py-3 px-6 text-lg font-medium hover:text-gray-400 "
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            href="/products"
            className="block py-3 px-6 text-lg font-medium hover:text-gray-400 "
            onClick={() => setMobileOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="block py-3 px-6 text-lg font-medium hover:text-gray-400 "
            onClick={() => setMobileOpen(false)}
          >
            🛒 Your Cart
          </Link>
        </div>
      )}
    </>
  );
};

export default Nav;
