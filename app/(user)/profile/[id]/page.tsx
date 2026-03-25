"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ username: "", contact: "" });

  const fetchUser = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch("/api/user", {
      headers: {
        "authorization": `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.data);
      setForm({
        username: data.data.username,
        contact: data.data.contact,
      });
    }
  };

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token")
    await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
       },
      body: JSON.stringify(form),
    });
    setEditing(false);
    fetchUser();
  };

  const statusColor = (status: string) => {
    if (status === "Delivered") return "bg-green-100 text-green-700";
    if (status === "Shipped") return "bg-yellow-100 text-yellow-700";
    if (status === "Cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-black">

      {/* NAVBAR */}
      <Navbar/>

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* LEFT: PROFILE */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-5 h-fit">

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#E8E1CF] flex items-center justify-center text-xl font-bold">
              {user.username[0]}
            </div>
            <h2 className="mt-3 font-semibold text-lg">{user.username}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <hr />

          {/* Editable Fields */}
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500">Username</p>
              {editing ? (
                <input
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="w-full border rounded p-2 mt-1"
                />
              ) : (
                <p className="font-medium">{user.username}</p>
              )}
            </div>

            <div>
              <p className="text-gray-500">Contact</p>
              {editing ? (
                <input
                  value={form.contact}
                  onChange={(e) =>
                    setForm({ ...form, contact: e.target.value })
                  }
                  className="w-full border rounded p-2 mt-1"
                />
              ) : (
                <p className="font-medium">{user.contact}</p>
              )}
            </div>

            <div>
              <p className="text-gray-500">Joined</p>
              <p className="font-medium">
                {new Date(user.createdAt).toDateString()}
              </p>
            </div>
          </div>

          {/* Actions */}
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="w-full border py-2 rounded-full hover:bg-gray-100"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="w-full bg-black text-white py-2 rounded-full"
            >
              Save Changes
            </button>
          )}
        </div>

        {/* RIGHT: ORDERS */}
        <div className="md:col-span-2 space-y-6">

          <h2 className="text-2xl font-semibold">Your Orders</h2>

          {user.orders.filter((order:any)=>{return order.paymentStatus == "Paid"}).length === 0 && (
            <div className="bg-white p-6 rounded-xl shadow text-gray-500">
              No orders yet ☕
            </div>
          )}

          {user.orders.filter((order: any)=>{return order.paymentStatus == "Paid"}).map((order: any) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border p-5"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toDateString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${statusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* ITEMS */}
              <div className="mt-4 space-y-3">
                {order.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.productGallery[0]}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {item.product.productName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-medium">
                      ₹{item.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t">
                <div className="text-sm text-gray-500">
                  Payment: {order.paymentStatus}
                </div>

                <div className="font-semibold">
                  ₹{order.total}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER
      <div className="text-center py-6 text-sm text-gray-500">
        © 2026 Coffee Store
      </div> */}
    </div>
  );
}