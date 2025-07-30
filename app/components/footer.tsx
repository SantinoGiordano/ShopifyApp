
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-blue-100 text-black pt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-6 pb-10 border-b border-slate-600">
          {/* Filler text section */}
          <div className="flex-1 bg-white bg-opacity-50 rounded-lg p-6 shadow-md border-l-4 border-purple-400">
            <h3 className="text-2xl font-bold mb-4 text-purple-800">
              About Us
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-gray-700">
              Meditation & Yoga is dedicated to helping you find balance, peace,
              and well-being through mindful practices and community support.
            </p>
            <p className="mb-4 text-sm text-gray-700">
              Contact us:{" "}
              <a
                href="mailto:info@meditationandyoga.com"
                className="underline text-purple-700 hover:text-purple-900 transition"
              >
                info@meditationandyoga.com
              </a>
            </p>
            <p className="text-sm text-gray-700">
              141 Main St, Berkshire, MA 01230
            </p>
          </div>

          {/* Newsletter form section */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold tracking-wide mb-4 border-b border-purple-600 inline-block pb-1">
              Stay Updated
            </h3>
            <form className="flex flex-col gap-4 w-full max-w-md">
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="p-3 rounded border border-gray-400 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="p-3 rounded border border-gray-400 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>
              <button
                type="submit"
                className="mt-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 rounded transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className=" pt-5 flex gap-6 justify-center">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="w-8 h-8 text-blue-800 hover:text-blue-600 transition" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-8 h-8 text-blue-800 hover:text-blue-600 transition" />
          </a>
        </div>
        <div className="text-center py-6 text-sm text-black">
          &copy; {new Date().getFullYear()} Meditation And Yoga. All rights
          reserved.
          <div className="mt-1">&quot;Somewhere in Berkshire&quot;</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
