"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  price: number | string;
  productName: string;
  description: string | null;
  category: string | null;
  stock: number;
  createdAt: Date;
  bestSeller: boolean;
  productGallery: string[];
}

export default function ProductGrid() {
  const [bestProducts, setBestProducts] = useState<Product[]>([]);

  async function getBestSellerProducts() {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const response = await res.json();
      const data = response.data || [];
      const bestSellerProducts = data.filter((item: Product) => item.bestSeller);
      setBestProducts(bestSellerProducts);
    } catch (err) {
      console.error("Error fetching products in ProductGrid:", err);
    }
  }

  useEffect(() => {
    getBestSellerProducts();
  }, []);

  return (
    <section className="relative w-full overflow-hidden px-[4%] py-24 md:px-[6%] md:py-32">
      <div className="absolute inset-0 bg-secondary/30 backdrop-blur-[2px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/40 via-transparent to-black/40"></div>
      </div>

      <div className="pointer-events-none absolute right-1/4 top-0 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[150px] mix-blend-screen"></div>

      <div className="relative z-10 mb-16 flex flex-col items-center text-center md:mb-24">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-6 bg-accent"></div>
          <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-accent">Our Signature</span>
          <div className="h-px w-6 bg-accent"></div>
        </div>
        <h2 className="mb-4 font-serif text-[42px] font-bold leading-tight text-white md:text-[64px]">
          TOP PICKS
        </h2>
        <p className="mx-auto max-w-2xl font-sans font-light text-white/60">
          Explore our most loved roasts. Carefully crafted blends that bring out the true alchemy of coffee.
        </p>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
        {bestProducts.map((product) => (
          <div key={product.id} className="group relative h-full">
            <div className="glass-panel-dark relative z-10 h-full rounded-[2.5rem] border border-white/10 p-6 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-white/20">
              <ProductCard product={product} />
            </div>
            <div className="pointer-events-none absolute inset-0 z-0 -m-4 rounded-[2rem] bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"></div>
          </div>
        ))}

        {bestProducts.length === 0 && (
          <div className="col-span-1 py-20 text-center font-sans uppercase tracking-widest text-white/50 sm:col-span-2 md:col-span-3">
            Loading our finest selections...
          </div>
        )}
      </div>
    </section>
  );
}
