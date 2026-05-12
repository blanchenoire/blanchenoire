"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { useParams, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import CartDrawer from "@/app/components/CartDrawer";

interface Product {
  id: string;
  price: number | string;
  productName: string;
  description: string | null;
  category: string | null;
  stock: number;
  createdAt: Date;
  bestSeller: Boolean;
  productGallery: string[];
}

export default function ProductPage() {
  const [qty, setQty] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentProd, setCurrentProd] = useState<Product | null>(null);
  const [openInfo, setOpenInfo] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();

  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    async function fetchRelated() {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      try {

        const res = await fetch(`/api/products/${id}`);
        const response = await res.json();
        const product = response.data;

        setCurrentProd(product);
        const allRes = await fetch(`/api/products`);
        const allResponse = await allRes.json();
        const allData = allResponse.data;

        const filtered = allData.filter(
          (p: Product) =>
            p.category === product.category && p.id !== id
        );

        setRelatedProducts(filtered);
      } catch (err) {
        console.error(err);
      }
    }

    if (id) fetchRelated();
  }, [id]);

  async function handleAddToCart() {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    if (!token) {
      router.push(`/login?redirect=/products/${id}`)
    }
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          quantity: qty
        }),
        headers: {
          "content": "application/json",
          "authorization": `Bearer ${token}`
        },
      })
      const response = await res.json();
      if (!response.success) {
        console.log(response.message)
      }
      setCartOpen(true)
    } catch (error) {
      console.error(error);
    }
  }


  if (!currentProd) {
    return <div className="min-h-screen bg-[#050607] p-10 text-white"><Loader /></div>;
  }

  return (
    <div className="theme-page">
      <Navbar />
      <div className="px-[6%] pb-12 pt-36 text-[#f8efe5]">

        {/* Breadcrumb */}
        <p className="mb-8 text-sm text-white/48">
          Home &gt; All Products &gt;{" "}
          <span className="text-white">{currentProd.productName}</span>
        </p>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Image */}
          <div className="glass-panel-dark flex items-center justify-center rounded-[2.5rem] border border-white/10 p-5 shadow-2xl">
            <Image
              className="rounded-[30px] drop-shadow-[0_28px_60px_rgba(0,0,0,0.42)]"
              src={currentProd.productGallery?.[0] || "/product.png"}
              alt={currentProd.productName}
              width={660}
              height={460}
            />
          </div>

          {/* Info */}
          <div className="glass-panel-dark rounded-[2.5rem] border border-white/10 p-7 shadow-2xl md:p-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#f0bf70]">Blanche Noire</p>
            <h1 className="font-serif mb-4 text-[44px] font-bold uppercase leading-[1.02] md:text-[62px]">
              {currentProd.productName}
            </h1>

            <p className="mb-6 text-[24px] text-[#f0bf70]">
              Rs. {Number(currentProd.price)}
            </p>

            <p className="mb-8 leading-7 text-white/64">
              {currentProd.description}
            </p>

            {/* Quantity */}
            <p className="mb-2 text-sm text-white/62">Quantity</p>

            <div className="glass-button mb-8 flex w-[120px] items-center rounded-full">
              <button
                className="px-4 py-2"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                −
              </button>

              <span className="flex-1 text-center">{qty}</span>

              <button
                className="px-4 py-2"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-10">
              <button onClick={() => {
                handleAddToCart()
              }} className="rounded-full bg-white px-10 py-3 font-bold text-[#102033]">
                Add to Cart
              </button>
            </div>

            {/* Accordion */}
            <div className="border-t border-white/12 pt-6">
              <button
                onClick={() => setOpenInfo(!openInfo)}
                className="flex w-full justify-between"
              >
                <span className="font-medium">PRODUCT INFO</span>
                <span>{openInfo ? "−" : "+"}</span>
              </button>

              {openInfo && (
                <p className="mt-4 leading-7 text-white/62">
                  {currentProd.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ✅ RELATED PRODUCTS */}
        <div className="mt-28">
          <h2 className="font-display mb-14 text-center text-[44px] font-bold uppercase text-white">
            You Might also like
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {relatedProducts.length === 0 && (
              <p>No related products found</p>
            )}

            {relatedProducts.map((product) => (
              <div key={product.id}>

                <div className="glass-panel-dark group relative flex h-[380px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">

                  {product.category && (
                    <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/14 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#f0bf70]">
                      {product.category}
                    </span>
                  )}

                  <Image
                    src={product.productGallery?.[0] || "/product.png"}
                    alt={product.productName}
                    width={240}
                    height={300}
                    className="absolute transition duration-500 group-hover:scale-105 group-hover:opacity-0"
                  />

                  {product.productGallery?.[1] && (
                    <Image
                      src={product.productGallery[1]}
                      alt={product.productName}
                      width={240}
                      height={300}
                      className="absolute opacity-0 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                  )}
                </div>

                <p className="mt-4 font-semibold text-white">{product.productName}</p>
                <p className="text-[#f0bf70]">
                  Rs. {Number(product.price)}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
      <Footer />
      <CartDrawer isOpen={cartOpen} setIsOpen={setCartOpen} />
    </div>
  );
}
