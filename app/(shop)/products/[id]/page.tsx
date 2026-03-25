"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { useParams, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { loadComponents } from "next/dist/server/load-components";
import CartDrawer from "@/app/components/CartDrawer";

interface Product {
  id: string;
  price: any;
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
    return <div className="p-10"><Loader /></div>;
  }

  return (
    <>
      <Navbar />
      <div className="px-[6%] py-12">

        {/* Breadcrumb */}
        <p className="text-sm mb-8 text-gray-500">
          Home &gt; All Products &gt;{" "}
          <span className="text-black">{currentProd.productName}</span>
        </p>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Image */}
          <div className="rounded-[36px] flex items-center justify-center">
            <Image
              className="rounded-[36px]"
              src={currentProd.productGallery?.[0] || "/product.png"}
              alt={currentProd.productName}
              width={660}
              height={460}
            />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-[56px] font-medium mb-4">
              {currentProd.productName}
            </h1>

            <p className="text-[24px] mb-6">
              Rs. {Number(currentProd.price)}
            </p>

            <p className="text-gray-600 mb-8">
              {currentProd.description}
            </p>

            {/* Quantity */}
            <p className="mb-2 text-sm">Quantity</p>

            <div className="flex items-center border rounded-full w-[120px] mb-8">
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
              }} className="bg-black text-white px-10 py-3 rounded-full">
                Add to Cart
              </button>
            </div>

            {/* Accordion */}
            <div className="border-t pt-6">
              <button
                onClick={() => setOpenInfo(!openInfo)}
                className="flex justify-between w-full"
              >
                <span className="font-medium">PRODUCT INFO</span>
                <span>{openInfo ? "−" : "+"}</span>
              </button>

              {openInfo && (
                <p className="mt-4 text-gray-600">
                  {currentProd.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ✅ RELATED PRODUCTS */}
        <div className="mt-28">
          <h2 className="text-[44px] text-center mb-14">
            You Might also like
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {relatedProducts.length === 0 && (
              <p>No related products found</p>
            )}

            {relatedProducts.map((product) => (
              <div key={product.id}>

                <div className="group bg-[#E6CEC4] rounded-[36px] h-[380px] flex items-center justify-center relative overflow-hidden">

                  {product.category && (
                    <span className="absolute top-5 left-5 bg-[#DFF4C9] text-xs px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  )}

                  <Image
                    src={product.productGallery?.[0] || "/product.png"}
                    alt={product.productName}
                    width={240}
                    height={300}
                    className="absolute transition-opacity duration-500 group-hover:opacity-0"
                  />

                  {product.productGallery?.[1] && (
                    <Image
                      src={product.productGallery[1]}
                      alt={product.productName}
                      width={240}
                      height={300}
                      className="absolute opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  )}
                </div>

                <p className="mt-4">{product.productName}</p>
                <p className="text-gray-600">
                  Rs. {Number(product.price)}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
      <Footer />
      <CartDrawer isOpen={cartOpen} setIsOpen={setCartOpen} />
    </>
  );
}