"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

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
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Orders</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by order ID or email..."
          className="w-full p-3 mb-6 border rounded-lg text-sm md:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Orders */}
        <div className="space-y-4 md:space-y-6">
          {filteredOrders.map((o) => (
            <div key={o.id} className="bg-white rounded-xl shadow p-4 md:p-5">

              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">
                    Order ID: {o.id}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    Payment ID: {o.razorpayPaymentId || "N/A"}
                  </p>
                </div>

                <span className="px-3 py-1 bg-gray-200 rounded-full text-xs md:text-sm w-fit">
                  {o.status}
                </span>
              </div>

              <p className="mt-2 text-sm md:text-base">
                <b>User:</b> {o.user.email}
              </p>
              <p className="text-sm md:text-base"><b>Total:</b> ₹{o.total}</p>
              <p className="text-sm md:text-base"><b>Payment:</b> {o.paymentStatus}</p>

              {/* Items */}
              <div className="mt-3 text-xs md:text-sm text-gray-600">
                {o.items.map((item: any) => (
                  <p key={item.id}>
                    {item.product.productName} × {item.quantity}
                  </p>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => updateStatus(o.id, "Shipped")}
                  className="px-3 py-1 bg-yellow-400 rounded text-sm"
                >
                  Ship
                </button>
                <button
                  onClick={() => updateStatus(o.id, "Delivered")}
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                >
                  Deliver
                </button>
                <button
                  onClick={() => updateStatus(o.id, "Cancelled")}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                >
                  Cancel
                </button>
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