"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/product", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/admin/product/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-black">

      {/* Navbar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-4 md:px-8 py-4 bg-[#E8E1CF] rounded-b-2xl shadow">

        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img className="h-8 md:h-10 w-auto" src="/a.png" alt="logo" />
          <span className="text-[10px] md:text-[12px] tracking-widest uppercase text-gray-600">
            Admin Panel
          </span>
        </div>

        <div className="flex gap-4 md:gap-6 font-medium text-sm md:text-base">
          <Link href="/admin/products" className="hover:underline">
            Products
          </Link>
          <Link href="/admin/orders" className="hover:underline">
            Orders
          </Link>
        </div>
      </div>

      <div className="p-4 md:p-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Products</h1>

          <Link
            href="/admin/products/new"
            className="bg-black text-white px-4 py-2 rounded-full text-sm md:text-base text-center"
          >
            + Add Product
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-3 mb-6 border rounded-lg text-sm md:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow p-4 space-y-2"
            >
              <img
                src={p.productGallery?.[0]}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h2 className="font-semibold text-base md:text-lg">
                {p.productName}
              </h2>

              <p className="text-xs md:text-sm text-gray-500">
                ID: {p.id.slice(0, 8)}...
              </p>

              <p className="text-sm md:text-base">₹{p.price}</p>
              <p className="text-sm md:text-base">Stock: {p.stock}</p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>

                <Link
                  href={`/admin/products/${p.id}`}
                  className="border px-3 py-1 rounded text-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs md:text-sm text-gray-500">
        © 2026 Coffee Admin Panel
      </div>
    </div>
  );
}