"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const router = useRouter()

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
            <div className="flex justify-between items-center px-8 py-4 bg-[#E8E1CF] rounded-b-2xl shadow">

                {/* Left: Logo + Admin Label */}
                <div
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <img className="w-24" src="/final-logo.png" alt="logo" />

                    <span className="text-[12px] tracking-widest uppercase text-gray-600 mt-4">
                        Admin Panel
                    </span>
                </div>

                {/* Right: Nav Links */}
                <div className="flex gap-6 font-medium">
                    <Link href="/admin/products" className="hover:underline">
                        Products
                    </Link>
                    <Link href="/admin/orders" className="hover:underline">
                        Orders
                    </Link>
                </div>

            </div>

            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Products</h1>

                    <Link
                        href="/admin/products/new"
                        className="bg-black text-white px-4 py-2 rounded-full"
                    >
                        + Add Product
                    </Link>
                </div>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-3 mb-6 border rounded-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Product List */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white rounded-xl shadow p-4 space-y-2"
                        >
                            <img
                                src={p.productGallery?.[0]}
                                className="w-full h-40 object-cover rounded-lg"
                            />

                            <h2 className="font-semibold text-lg">{p.productName}</h2>

                            <p className="text-sm text-gray-500">
                                ID: {p.id.slice(0, 8)}...
                            </p>

                            <p>₹{p.price}</p>
                            <p>Stock: {p.stock}</p>

                            <div className="flex justify-between mt-3">
                                <button
                                    onClick={() => deleteProduct(p.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>

                                <Link
                                    href={`/admin/products/${p.id}`}
                                    className="border px-3 py-1 rounded"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="text-center py-4 text-sm text-gray-500">
                © 2026 Coffee Admin Panel
            </div>
        </div>
    );
}