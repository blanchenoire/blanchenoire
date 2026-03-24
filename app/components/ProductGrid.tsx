"use client"
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

// const products = [
//   {
//     title: "CITRUS SYMPHONY",
//     image: "/product.png",
//     hoverImage: "/pattern.png",
//   },
//   {
//     title: "AMBER ALLURE",
//     image: "/product.png",
//     hoverImage: "/pattern.png",
//   },
//   {
//     title: "HAZELNUT HARMONY",
//     image: "/product.png",
//     hoverImage: "/pattern.png",
//     bestSeller: true,
//   },
//   {
//     title: "SUNRISE SERENADE",
//     image: "/product.png",
//     hoverImage: "/pattern.png",
//     bestSeller: true,
//   },
//   {
//     title: "COCOA BLISS",
//     image: "/product.png",
//     hoverImage: "/pattern.png",
//   },
//   {
//     title: "NUTTY NIRVANA",
//     image: "/product.png",
//     hoverImage: "/pattern.png",
//     bestSeller: true,
//   },
// ];

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


export default function ProductGrid() {
  const [bestProducts, setBestProducts] = useState<Product[]>([]);

  async function getBestSellerProducts() {
    const res = await fetch("/api/products")
    const response = await res.json();
    const data = response.data
    const bestSellerProducts = data.filter((item: Product)=>{
      return item.bestSeller
    })
    setBestProducts(bestSellerProducts)
  }
  useEffect(()=>{
    getBestSellerProducts()
  }, [])
  return (
    <section className="px-[6%] py-16 md:py-24">

  <h2 className="text-[32px] md:text-[64px] mb-10 md:mb-16">
    TOP PICKS
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
    {bestProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>

</section>
  );
}