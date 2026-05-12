"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

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

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <div className="group relative flex h-full cursor-pointer flex-col">
      <div
        onClick={() => {
          router.push(`/products/${product.id}`);
        }}
        className="relative mb-6 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-white/5 transition-colors duration-500 group-hover:bg-white/10"
      >
        {product.bestSeller && (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-accent px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-widest text-secondary shadow-[0_0_15px_rgba(229,168,84,0.4)]">
            Best Seller
          </span>
        )}

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        <Image
          src={product.productGallery?.[0] || "/product.png"}
          alt={product.productName}
          fill
          className="z-0 object-cover object-center transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 300px"
        />

        <div className="absolute bottom-4 left-1/2 z-20 translate-y-4 -translate-x-1/2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="glass-panel flex items-center gap-2 rounded-full border border-white/20 px-4 py-2">
            <span className="font-sans text-xs uppercase tracking-widest text-white">View Details</span>
            <ArrowRight className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>

      <div className="flex flex-grow flex-col text-center">
        <h3 className="mb-2 font-serif text-xl font-bold text-white transition-colors group-hover:text-accent md:text-2xl">
          {product.productName}
        </h3>
        <p className="mb-4 font-sans text-xs uppercase tracking-widest text-white/50">
          {product.category?.replaceAll("_", " ")}
        </p>
        <div className="mt-auto">
          <p className="font-sans text-lg font-medium text-accent">₹{product.price}</p>
        </div>
      </div>
    </div>
  );
}
