"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  productName: string;
  price: number;
  productGallery: string[];
  category: string;
}

export default function ProductCategorySlider() {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await fetch("/api/categories");
      const catData = await catRes.json();

      const prodRes = await fetch("/api/products");
      const prodData = await prodRes.json();

      setCategories(catData.categories);
      setProducts(prodData.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredProducts =
    activeCategory === "ALL"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <div className="px-[6%] py-24 text-center text-gray-500">
        Loading collections...
      </div>
    );
  }

  return (
    <section className="px-[6%] py-20 md:py-16">

      {/* 🔥 BIG HEADING */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-[36px] md:text-[64px] leading-tight font-extrabold tracking-tight">
          Curated Collections
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Explore our range of coffee, crafted with precision and intent.
        </p>
      </div>

      {/* 🔥 CATEGORY TABS */}
      <div className="flex gap-8 overflow-x-auto pb-4 text-sm md:text-base font-medium">

        <button
          onClick={() => setActiveCategory("ALL")}
          className={`pb-2 whitespace-nowrap transition ${
            activeCategory === "ALL"
              ? "border-b-2 border-black text-black"
              : "text-gray-400 hover:text-black"
          }`}
        >
          ALL PRODUCTS
        </button>

        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`pb-2 whitespace-nowrap transition ${
              activeCategory === cat
                ? "border-b-2 border-black text-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {cat.replaceAll("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {/* 🔥 SLIDER */}
      <div className="mt-12">

        {filteredProducts.length > 0 ? (
          <div className="flex gap-10 overflow-x-auto no-scrollbar">

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-[260px] max-w-[260px] flex-shrink-0 group cursor-pointer"
                onClick={()=>{router.push(`/products/${product.id}`)}}
              >
                {/* IMAGE */}
                <div className="rounded-2xl overflow-hidden bg-[#ebe7df] shadow-sm">
                  <Image
                    src={product.productGallery?.[0]}
                    alt={product.productName}
                    width={400}
                    height={400}
                    className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* INFO */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold group-hover:underline">
                    {product.productName}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            ))}

          </div>
        ) : (
          /* 🔥 PREMIUM EMPTY STATE */
          <div className="mt-10 flex flex-col items-center justify-center h-[220px] bg-[#ebe7df] rounded-2xl text-center">

            <p className="text-xl md:text-2xl font-semibold mb-2">
              Coming Soon
            </p>

            <p className="text-gray-500 text-sm max-w-[300px]">
              This collection is currently being curated. Stay tuned.
            </p>

          </div>
        )}

      </div>
    </section>
  );
}