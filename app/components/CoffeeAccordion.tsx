"use client";

import { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function CoffeeCategoryAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  async function getAllProducts() {
    let cats: string[] = [];
    const res = await fetch("/api/products");
    const response = await res.json();
    const products = response.data;

    setProducts(products);

    products.forEach((product: Product) => {
      if (product.category && !cats.includes(product.category)) {
        cats.push(product.category);
      }
    });

    setCategories(cats);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  const toggle = (i: number) => {
    setOpen(open === i ? null : i);
  };

  return (
    <section className="bg-[#891A10] text-[#D8D4BC] py-16 md:py-28">
    {/* <section className="bg-[#D8D4BC] text-black py-16 md:py-28"> */}

      {/* HEADER */}
      <div className="px-[6%] flex flex-col md:flex-row justify-between items-start gap-8 mb-12 md:mb-20">

        <div>
          <h2 className="text-[36px] md:text-[70px] leading-[1.1] mb-4 md:mb-6">
            COFFEE COLLECTION
          </h2>

          <p className="max-w-155 text-sm md:text-lg">
            Discover our carefully curated coffee categories — from premium
            beans to machines and handcrafted beverages.
          </p>
        </div>

        {/* <button
          onClick={() => router.push("/products")}
          className="bg-[#0E3B34] text-white px-5 py-2 md:px-6 md:py-3 rounded-full"
        > */}
        <button
          onClick={() => router.push("/products")}
          className="bg-[#D8D4BC] text-black px-5 py-2 md:px-6 md:py-3 rounded-full"
        >
          EXPLORE ALL PRODUCTS
        </button>

      </div>

      {/* ACCORDION */}
      <div className="w-full border-t border-[#D8D4BC]">
      {/* <div className="w-full border-t border-black"> */}

        {categories.map((cat, i) => (
          <div key={i} className="border-b border-[#D8D4BC]">
          {/* <div key={i} className="border-b border-black"> */}

            {/* CATEGORY HEADER */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center px-[6%] py-6 md:py-10"
            >
              <span className="text-[22px] md:text-[40px] tracking-wide">
                {cat}
              </span>

              {open === i ? <Minus size={24} /> : <Plus size={24} />}
            </button>

            {/* CONTENT */}
            <div
              className={`transition-all duration-500 overflow-hidden ${
                open === i ? "max-h-[800px] pb-10 md:pb-16" : "max-h-0"
              }`}
            >
              <div className="px-[6%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mt-6">

                {products
                  .filter((prod) => prod.category === cat)
                  .slice(0, 3)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="bg-[#E7CBB4] rounded-3xl p-6 md:p-8 flex flex-col items-center"
                    >
                      <Image
                        className="rounded-lg"
                        src={p.productGallery?.[0]}
                        alt={p.productName}
                        width={150}
                        height={200}
                      />

                      <p className="text-black mt-4 font-medium text-sm md:text-base text-center">
                        {p.productName}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="px-[6%] mt-6 md:mt-10">
                {/* <button className="bg-[#0E3B34] text-white px-5 py-2 md:px-6 md:py-3 rounded-full">
                  SEE ALL {cat}
                </button> */}
                <button className="bg-[#D8D4BC] text-black px-5 py-2 md:px-6 md:py-3 rounded-full">
                  SEE ALL {cat}
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}