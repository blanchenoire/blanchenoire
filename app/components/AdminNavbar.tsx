"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminNavbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    contact: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
        setLoading(true);
      const res = await fetch("/api/admin/add-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false)
      if (data.success) {
        alert("Admin added successfully");
        setOpen(false);
        setForm({
          email: "",
          username: "",
          password: "",
          contact: "",
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-4 md:px-8 py-4 bg-[#E8E1CF] rounded-b-2xl shadow">

        {/* LEFT */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img className="h-10 md:h-14 w-auto" src="/final-logo.png" alt="logo" />
          <span className="text-[10px] md:text-[12px] tracking-widest uppercase text-gray-600">
            Admin Panel
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 md:gap-6 font-medium text-sm md:text-base">

          <Link href="/admin/products" className="hover:underline">
            Products
          </Link>

          <Link href="/admin/orders" className="hover:underline">
            Orders
          </Link>

          {/* 🔥 ADD ADMIN BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-full text-sm"
          >
            + Add Admin
          </button>
        </div>
      </div>

      {/* 🔥 MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md space-y-4">

            <h2 className="text-xl font-semibold">Add New Admin</h2>

            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <input
              name="password"
              placeholder="Set Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <input
              name="contact"
              placeholder="Contact"
              value={form.contact}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded-lg cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled = {loading}
                className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer"
              >
                {loading? "Creating.." : "Create"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}