"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminNavbar from "@/app/components/AdminNavbar";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    bestSeller: false,
  });
  const [editLoading, setEditLoading] = useState(false);

  // ✅ Fetch products
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/product", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProducts(data);
  };

  // ✅ Fetch categories from backend
  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.categories);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ✅ Handle update
  const handleUpdate = async () => {
    if (!editProduct) return;

    const token = localStorage.getItem("token");
    setEditLoading(true);

    try {
      await fetch(`/api/admin/product/${editProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editForm,
          price: Number(editForm.price),
          stock: Number(editForm.stock),
        }),
      });

      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }

    setEditLoading(false);
  };

  const handleEditChange = (e: any) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Delete product
  const deleteProduct = async (id: string) => {
    const token = localStorage.getItem("token");
    setDeleteLoading(true);

    await fetch(`/api/admin/product/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setDeleteLoading(false);
    fetchProducts();
  };

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-black">
      <AdminNavbar />

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
          className="w-full p-3 mb-6 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow p-4 space-y-2">
              <img
                src={p.productGallery?.[0]}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h2 className="font-semibold">{p.productName}</h2>
              <p className="text-xs text-gray-500">
                ID: {p.id.slice(0, 8)}...
              </p>

              <p>₹{p.price}</p>
              <p>Stock: {p.stock}</p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => deleteProduct(p.id)}
                  disabled={deleteLoading}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  {deleteLoading ? "Deleting.." : "Delete"}
                </button>

                <button
                  onClick={() => {
                    setEditProduct(p);
                    setEditForm({
                      productName: p.productName || "",
                      description: p.description || "",
                      price: p.price || "",
                      stock: p.stock || "",
                      category: p.category || "",
                      bestSeller: p.bestSeller || false,
                    });
                  }}
                  className="border px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md space-y-4 max-h-[90vh] overflow-y-auto">

            <h2 className="text-xl font-semibold">Edit Product</h2>

            <input
              name="productName"
              value={editForm.productName}
              onChange={handleEditChange}
              placeholder="Product Name"
              className="w-full border p-2 rounded"
            />

            <textarea
              name="description"
              value={editForm.description}
              onChange={handleEditChange}
              placeholder="Description"
              className="w-full border p-2 rounded"
            />

            <input
              name="price"
              type="number"
              value={editForm.price}
              onChange={handleEditChange}
              placeholder="Price"
              className="w-full border p-2 rounded"
            />

            <input
              name="stock"
              type="number"
              value={editForm.stock}
              onChange={handleEditChange}
              placeholder="Stock"
              className="w-full border p-2 rounded"
            />

            {/* ✅ Dynamic Category */}
            <select
              name="category"
              value={editForm.category}
              onChange={handleEditChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replaceAll("_", " ")}
                </option>
              ))}
            </select>

            {/* ✅ BestSeller */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editForm.bestSeller}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    bestSeller: e.target.checked,
                  })
                }
              />
              Best Seller
            </label>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditProduct(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={editLoading}
                className="bg-black text-white px-4 py-2 rounded"
              >
                {editLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-4 text-gray-500">
        © 2026 Coffee Admin Panel
      </div>
    </div>
  );
}