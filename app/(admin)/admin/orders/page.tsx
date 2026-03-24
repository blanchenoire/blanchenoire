"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter()

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const filteredOrders = orders.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.user.email.toLowerCase().includes(search.toLowerCase())
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
        <h1 className="text-3xl font-bold mb-6">Orders</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by order ID or email..."
          className="w-full p-3 mb-6 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Orders */}
        <div className="space-y-6">
          {filteredOrders.map((o) => (
            <div key={o.id} className="bg-white rounded-xl shadow p-5">
              
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID: {o.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment ID: {o.razorpayPaymentId || "N/A"}
                  </p>
                </div>

                <span className="px-3 py-2 bg-gray-200 rounded-full text-sm">
                  {o.status}
                </span>
              </div>

              <p className="mt-2"><b>User:</b> {o.user.email}</p>
              <p><b>Total:</b> ₹{o.total}</p>
              <p><b>Payment:</b> {o.paymentStatus}</p>

              {/* Items */}
              <div className="mt-3 text-sm text-gray-600">
                {o.items.map((item: any) => (
                  <p key={item.id}>
                    {item.product.productName} × {item.quantity}
                  </p>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => updateStatus(o.id, "Shipped")}
                  className="px-3 py-1 bg-yellow-400 rounded"
                >
                  Ship
                </button>
                <button
                  onClick={() => updateStatus(o.id, "Delivered")}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Deliver
                </button>
                <button
                  onClick={() => updateStatus(o.id, "Cancelled")}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
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