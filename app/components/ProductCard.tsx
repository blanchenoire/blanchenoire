"use client";

import Image from "next/image";

interface Product {
  id: string;
  price: any;
  productName: string;
  description: string | null;
  category: string | null;
  stock: number;
  createdAt: Date;
  bestSeller: boolean;
  productGallery: string[];
}

export default function ProductCard({product}: {product: Product}) {
  return (
    <div className="group cursor-pointer">
      
      {/* IMAGE CARD */}
      <div className="relative rounded-3xl overflow-hidden bg-[#D7BFB3] h-[420px] flex items-center justify-center">

        {product.bestSeller && (
          <span className="absolute top-5 left-5 z-20 bg-[#D7F2C2] text-black text-xs px-3 py-1 rounded-full">
            Best Seller
          </span>
        )}

        {/* DEFAULT IMAGE */}
        <Image
          src={product.productGallery?.[0]}
          alt={product.productName}
          width={260}
          height={320}
          className="absolute transition-opacity duration-500 group-hover:opacity-0"
        />

        {/* HOVER IMAGE */}
        <Image
          src={product.productGallery?.[1]}
          alt={product.productName}
          width={260}
          height={320}
          className="absolute opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

      </div>

      {/* TITLE */}
      <p className="mt-4 text-lg tracking-wide">{product.productName}</p>

    </div>
  );
}