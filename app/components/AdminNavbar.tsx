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
      <div className="glass-panel flex flex-col gap-3 rounded-b-2xl px-4 py-4 text-[#f8efe5] shadow md:flex-row md:items-center md:justify-between md:px-8">

        {/* LEFT */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img className="h-10 md:h-14 w-auto" src="/final-logo.png" alt="logo" />
          <span className="text-[10px] uppercase tracking-widest text-[#f0bf70] md:text-[12px]">
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
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#102033]"
          >
            + Add Admin
          </button>
        </div>
      </div>

      {/* 🔥 MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="glass-panel w-[90%] max-w-md space-y-4 rounded-2xl p-6 text-[#f8efe5]">

            <h2 className="text-xl font-semibold">Add New Admin</h2>

            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="theme-input w-full rounded-lg p-3"
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="theme-input w-full rounded-lg p-3"
            />

            <input
              name="password"
              placeholder="Set Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="theme-input w-full rounded-lg p-3"
            />

            <input
              name="contact"
              placeholder="Contact"
              value={form.contact}
              onChange={handleChange}
              className="theme-input w-full rounded-lg p-3"
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="glass-button cursor-pointer rounded-lg px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled = {loading}
                className="cursor-pointer rounded-lg bg-white px-4 py-2 font-bold text-[#102033]"
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
