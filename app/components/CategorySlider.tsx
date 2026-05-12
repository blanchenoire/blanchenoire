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
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch("/api/categories");
        const catData = await catRes.json();

        const prodRes = await fetch("/api/products");
        const prodData = await prodRes.json();

        setCategories(catData.categories || []);
        setProducts(prodData.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts =
    activeCategory === "ALL"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <div className="px-[6%] py-24 text-center font-sans uppercase tracking-widest text-white/50">
        Loading collections...
      </div>
    );
  }

  return (
    <section className="relative w-full overflow-hidden px-[4%] py-20 md:px-[6%] md:py-32">
      <div className="absolute inset-0 bg-secondary/20 backdrop-blur-[2px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-black/40"></div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px] mix-blend-screen"></div>

      <div className="relative z-10 mb-16 flex flex-col items-end justify-between gap-8 border-b border-white/10 pb-8 text-center md:mb-20 md:flex-row md:text-left">
        <div>
          <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
            <div className="h-px w-6 bg-accent"></div>
            <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent">Curated Collections</span>
          </div>
          <h2 className="font-serif text-[36px] font-bold leading-tight text-white md:text-[56px]">
            Explore by Origin
          </h2>
        </div>
        <p className="hidden max-w-[320px] font-light text-white/60 md:block">
          Discover our range of specialty coffee, each crafted with precision and intent to highlight its unique alchemy.
        </p>
      </div>

      <div className="no-scrollbar relative z-10 mb-12 flex gap-10 overflow-x-auto pb-4 font-sans text-sm font-medium uppercase tracking-widest md:text-base">
        <button
          onClick={() => setActiveCategory("ALL")}
          className={`relative whitespace-nowrap pb-2 transition-all duration-300 ${
            activeCategory === "ALL" ? "text-accent" : "text-white/40 hover:text-white"
          }`}
        >
          ALL PRODUCTS
          {activeCategory === "ALL" && <span className="absolute bottom-0 left-0 h-[2px] w-full bg-accent"></span>}
        </button>

        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`relative whitespace-nowrap pb-2 transition-all duration-300 ${
              activeCategory === cat ? "text-accent" : "text-white/40 hover:text-white"
            }`}
          >
            {cat.replaceAll("_", " ")}
            {activeCategory === cat && <span className="absolute bottom-0 left-0 h-[2px] w-full bg-accent"></span>}
          </button>
        ))}
      </div>

      <div className="relative z-10">
        {filteredProducts.length > 0 ? (
          <div className="no-scrollbar flex gap-8 overflow-x-auto scroll-smooth pb-10 md:gap-12">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group min-w-[280px] max-w-[280px] flex-shrink-0 cursor-pointer md:min-w-[340px] md:max-w-[340px]"
                onClick={() => {
                  router.push(`/products/${product.id}`);
                }}
              >
                <div className="glass-panel-dark relative mb-6 aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl transition-colors duration-500 group-hover:border-white/30">
                  <div className="absolute inset-0 z-10 bg-secondary/20 transition-colors duration-500 group-hover:bg-transparent"></div>
                  <Image
                    src={product.productGallery?.[0] || "/product.png"}
                    alt={product.productName}
                    fill
                    className="object-cover object-center transition-transform duration-[10s] ease-out group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-col items-start justify-between gap-4 px-2 text-center md:flex-row md:text-left">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white transition-colors group-hover:text-accent">
                      {product.productName}
                    </h3>
                    <p className="mt-2 font-sans text-xs uppercase tracking-widest text-white/50">
                      {product.category?.replaceAll("_", " ")}
                    </p>
                  </div>
                  <p className="font-sans text-lg font-medium text-accent">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel-dark flex h-[300px] flex-col items-center justify-center rounded-[3rem] border border-white/10 text-center backdrop-blur-md">
            <p className="mb-3 font-serif text-2xl font-bold text-white">Coming Soon</p>
            <p className="max-w-[300px] font-light text-white/60">
              This collection is currently being curated by our alchemists.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
