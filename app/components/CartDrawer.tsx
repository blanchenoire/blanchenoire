"use client";

import { Loader, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function CartDrawer({ isOpen, setIsOpen }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<any>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [total, setTotal] = useState<any>(0)
  const [waitLoading, setWaitLoading] = useState<boolean>(false)
  const [itemsLoading, setItemsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function fetchCart() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setCartItems([]);
      setTotal(0);
      return;
    }

    let sum = 0;
    setItemsLoading(true)

    const res = await fetch(`/api/cart/user/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setItemsLoading(false)
    const response = await res.json();
    
    const items = response.data?.CartItem || [];

    setCartItems(items);

    items.forEach((item: any) => {
      const price = Number(item.Product.price);
      sum += price * item.quantity;
    });

    setTotal(sum);
  }
  useEffect(() => {
    if (isOpen) {
      fetchCart()
    }
  }, [isOpen])

  const handleDelete = async (cartItemId: string) => {
    try {
      setDeletingId(cartItemId);
      const token = localStorage.getItem("token");

      await fetch(`/api/cart/cartItem/${cartItemId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      // remove item locally (instant UI update)
      const updatedItems = cartItems.filter((item: any) => item.id !== cartItemId);
      setCartItems(updatedItems);

      // recalculate total
      let sum = 0;
      updatedItems.forEach((item: any) => {
        sum += item.Product.price * item.quantity;
      });
      setTotal(sum);
      setDeletingId(null);

    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  const handleCheckoutButton = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
        alert("Please login first");
        router.push("/login");
        return;
    }

    try {
        setWaitLoading(true)
        const res = await fetch("/api/auth/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId })
        });
        setWaitLoading(false)
        const response = await res.json();

        if (!response.success) {
            alert("Something went wrong. Please try again.");
            return;
        }

        if (response.alreadyVerified) {
            router.push("/checkout");
        } else {
            router.push("/verify-otp");
        }

    } catch (error) {
        console.error(error);
        alert("Something went wrong");
    }
};
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-95 bg-white z-50 shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="font-semibold text-lg">Cart ({cartItems.length} item)</h2>

          <button onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        {
        itemsLoading ? <div className="flex items-center justify-center h-[50vh]"> <Loader/> </div>:
        cartItems.map((item: any) => {
          return (
            <div
              key={item.id}
              className="p-5 flex gap-4 border-b items-start"
            >
              <img
                src={item.Product.productGallery?.[0]}
                className="w-16 h-16 object-cover rounded"
              />

              <div
                className="flex-1 hover:cursor-pointer"
                onClick={() => {
                  router.push(`/products/${item.Product.id}`);
                }}
              >
                <p className="font-medium">{item.Product.productName}</p>
                <p className="text-sm text-gray-500">Rs. {item.Product.price}</p>

                <div className="flex items-center gap-2 mt-2 border w-fit px-2 py-1">
                  <span>{item.quantity}</span>
                </div>
              </div>

              {/* Right section */}
              <div className="flex flex-col items-end gap-2">
                <p>Rs. {item.Product.price}</p>

                <button
                  disabled={deletingId === item.id}
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 text-sm hover:underline disabled:opacity-50"
                >
                  {deletingId === item.id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          )
        })

        }
        {/* Bottom Section */}
        <div className="absolute bottom-0 w-full p-5 border-t">
          <p className="flex justify-between font-medium">
            <span>Estimated total</span>
            <span>Rs. {total}</span>
          </p>

          <button disabled={total == 0 || waitLoading} onClick={handleCheckoutButton} className="w-full hover:cursor-pointer bg-green-700 text-white py-3 mt-4 rounded">
            { waitLoading ? "Please wait.." : "Checkout"}
          </button>

          <button className="w-full border py-3 mt-3 rounded">
            View Cart
          </button>
        </div>
      </div>
    </>
  );
}