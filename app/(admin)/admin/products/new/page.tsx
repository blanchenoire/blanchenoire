"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AddProductPage() {
    const router = useRouter();
    const pathname = usePathname();

    const [form, setForm] = useState({
        productName: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        bestSeller: false,
    });

    const [images, setImages] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleImageChange = (e: any) => {
        const files: Array<File> = Array.from(e.target.files);
        setImages(files);

        const previews = files.map((file: any) => URL.createObjectURL(file));
        setPreview(previews);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (images.length < 2) {
            return;
        }

        setLoading(true);

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("productName", form.productName);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("category", form.category);
        formData.append("stock", form.stock);
        formData.append("bestSeller", String(form.bestSeller));

        images.forEach((img) => {
            formData.append("images", img);
        });

        const res = await fetch("/api/admin/product", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        setLoading(false);

        if (res.ok) {
            router.push("/admin/products");
        } else {
            alert("Failed to add product");
        }
    };

    const isProducts = pathname.includes("/admin/products");

    return (
        <div className="min-h-screen bg-[#F4F4F4]">

            {/* Navbar */}
            <div className="flex justify-between items-center px-8 py-4 bg-[#E8E1CF] rounded-b-2xl shadow">
                <div
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <img className="w-24" src="/final-logo.png" />
                    <span className="text-[10px] tracking-widest uppercase text-gray-600 mt-4">
                        Admin Panel
                    </span>
                </div>

                <div className="flex gap-6 font-medium">
                    <Link
                        href="/admin/products"
                        className={isProducts ? "font-bold underline" : ""}
                    >
                        Products
                    </Link>
                    <Link href="/admin/orders">Orders</Link>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-3xl mx-auto bg-white mt-10 p-8 rounded-2xl shadow">
                <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <input
                        name="productName"
                        placeholder="Product Name"
                        className="w-full p-3 border rounded-lg"
                        onChange={handleChange}
                        required
                    />

                    {/* Description */}
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="w-full p-3 border rounded-lg"
                        onChange={handleChange}
                    />

                    {/* Price + Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="price"
                            placeholder="Price"
                            type="number"
                            className="p-3 border rounded-lg"
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="stock"
                            placeholder="Stock"
                            type="number"
                            className="p-3 border rounded-lg"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Category */}
                    <input
                        name="category"
                        placeholder="Category (e.g. Coffee, Beans)"
                        className="w-full p-3 border rounded-lg"
                        onChange={handleChange}
                    />

                    {/* Best Seller */}
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="bestSeller"
                            onChange={handleChange}
                        />
                        Mark as Bestseller ⭐
                    </label>

                    {images.length > 0 && images.length < 2 && (
                        <p className="text-red-500 text-sm">
                            Please upload at least 2 images
                        </p>
                    )}
                    {/* Images */}
                    <div>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            className="mb-3"
                        />

                        <div className="flex gap-3 flex-wrap">
                            {preview.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-full hover:opacity-90"
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>

            {/* Footer */}
            <div className="text-center py-4 text-sm text-gray-500">
                © 2026 Coffee Admin Panel
            </div>
        </div>
    );
}