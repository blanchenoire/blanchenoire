"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Coffee Beans",
    "Cold Coffee",
    "Chocolate",
    "Bakery",
    "Gifts",
  ];

  const [addedIndex, setAddedIndex] = useState<number | null>(null);

  const products = [
    {
      name: "Signature Blend",
      price: "₹799",
      notes: "Dark Chocolate · Hazelnut",
    },
    {
      name: "Noir Intense",
      price: "₹849",
      notes: "Cocoa · Smoky Finish",
    },
    {
      name: "Gold Reserve",
      price: "₹1299",
      notes: "Floral · Citrus",
    },
    {
      name: "Cold Noir Brew",
      price: "₹599",
      notes: "Smooth · Cherry",
    },
  ];

  return (
    <main className="bg-[#faf8f5] text-black font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-12 h-16 bg-white/90 backdrop-blur border-b border-red-200">
        <h1 className="text-3xl text-[#C8102E] font-serif">
          Blanche Noire
        </h1>

        <ul className="flex gap-8 text-xs uppercase tracking-widest">
          <li><a href="#beans">Coffee</a></li>
          <li><a href="#drinks">Drinks</a></li>
          <li><a href="#bakery">Bakery</a></li>
          <li><a href="#gifts">Gifts</a></li>
        </ul>

        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-xs uppercase">Cart</span>
          <span className="bg-[#C8102E] text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px]">
            3
          </span>
        </div>
      </nav>

      {/* HERO */}
      <section className="mt-16 min-h-[90vh] grid md:grid-cols-2 bg-[#1a0a0a] text-white">
        <div className="flex flex-col justify-center px-10 md:px-16">
          <p className="text-xs tracking-[4px] text-[#C8102E] uppercase mb-6">
            Maison de Café — Est. Paris, 2024
          </p>

          <h1 className="text-6xl md:text-7xl font-serif leading-none">
            Blanche <br /> Noire
          </h1>

          <p className="italic text-gray-400 mt-2 mb-6">
            L'art du café français
          </p>

          <p className="text-sm text-gray-400 max-w-md mb-8">
            Where bold red passion meets the dark elegance of artisanal coffee.
          </p>

          <div className="flex gap-4">
            <button className="bg-[#C8102E] px-6 py-3 uppercase text-xs tracking-widest hover:bg-red-800">
              Shop Collection
            </button>
            <button className="text-gray-300 uppercase text-xs">
              Our Story
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-48 h-64 bg-gradient-to-br from-black to-red-900 rounded-b-3xl relative">
            <div className="absolute inset-0 flex items-center justify-center text-[#C8102E] text-2xl font-serif">
              BN
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <div className="bg-black text-white flex overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-6 py-4 text-xs uppercase tracking-widest border-b-2 ${
              activeTab === i
                ? "border-[#C8102E] text-white"
                : "border-transparent text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <section className="p-8 md:p-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product, i) => (
          <div
            key={i}
            className="bg-white p-6 border hover:shadow-xl transition"
          >
            <div className="text-lg font-serif mb-1">
              {product.name}
            </div>

            <p className="text-sm text-gray-500 mb-4">
              {product.notes}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-xl font-serif">
                {product.price}
              </span>

              <button
                onClick={() => {
                  setAddedIndex(i);
                  setTimeout(() => setAddedIndex(null), 1200);
                }}
                className={`px-4 py-2 text-xs uppercase text-white ${
                  addedIndex === i ? "bg-green-700" : "bg-[#C8102E]"
                }`}
              >
                {addedIndex === i ? "✓ Added" : "+ Add"}
              </button>
            </div>
          </div>
        ))}

      </section>

      {/* SIMPLE FOOTER */}
      <footer className="bg-black text-white text-center py-10 mt-10">
        <h2 className="text-2xl text-[#C8102E] mb-2 font-serif">
          Blanche Noire
        </h2>
        <p className="text-gray-400 text-sm">
          Premium lifestyle coffee for the modern connoisseur.
        </p>
      </footer>

    </main>
  );
}