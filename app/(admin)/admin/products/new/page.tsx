"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import AdminNavbar from "@/app/components/AdminNavbar";

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
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const res = await fetch("/api/categories");
    const response = await res.json();
    setCategories(response.categories)
  }

  useEffect(() => {
    getCategories()
  }, [])

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

    if (images.length < 2) return;

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
      <AdminNavbar/>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white mt-6 md:mt-10 p-4 md:p-8 rounded-2xl shadow">
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            name="productName"
            placeholder="Product Name"
            className="w-full p-3 border rounded-lg text-sm md:text-base"
            onChange={handleChange}
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-3 border rounded-lg text-sm md:text-base"
            onChange={handleChange}
          />

          {/* Price + Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="price"
              placeholder="Price"
              type="number"
              className="p-3 border rounded-lg text-sm md:text-base"
              onChange={handleChange}
              required
            />
            <input
              name="stock"
              placeholder="Stock"
              type="number"
              className="p-3 border rounded-lg text-sm md:text-base"
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          {/* <input
            name="category"
            placeholder="Category (e.g. Coffee, Beans)"
            className="w-full p-3 border rounded-lg text-sm md:text-base"
            onChange={handleChange}
          /> */}

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-sm md:text-base"
          >
            <option value="">Select Category</option>

            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Best Seller */}
          <label className="flex items-center gap-2 text-sm md:text-base">
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
              className="mb-3 text-sm"
            />

            <div className="flex gap-3 flex-wrap">
              {preview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full hover:opacity-90 text-sm md:text-base cursor-pointer"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs md:text-sm text-gray-500">
        © 2026 Coffee Admin Panel
      </div>
    </div>
  );
}