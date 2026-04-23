"use client"
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Checkout() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [showAllAddresses, setShowAllAddresses] = useState(false);
    const router = useRouter()
    const [addressForm, setAddressForm] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        isDefault: false
    });

    useEffect(() => {
        async function fetchData() {
            // read localStorage inside useEffect — client only
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (!userId || !token) return;

            try {
                setLoading(true);

                const [cartRes, addrRes] = await Promise.all([
                    fetch("/api/cart/user", {
                        headers: { authorization: `Bearer ${token}` }
                    }),
                    fetch("/api/delivery-details/user", {
                        headers: { authorization: `Bearer ${token}` }
                    })
                ]);

                const cartData = await cartRes.json();
                const addrData = await addrRes.json();

                const items = cartData.data?.CartItem || [];
                setCartItems(items);

                const computedTotal = items.reduce(
                    (sum: number, item: any) => sum + item.Product.price * item.quantity, 0
                );
                setTotal(computedTotal);

                setAddresses(addrData.data || []);

                const addrList = addrData.data || [];
                setAddresses(addrList);

                // find default
                const defaultAddr = addrList.find((a: any) => a.isDefault);

                if (defaultAddr) {
                    setSelectedAddress(defaultAddr.id);
                } else if (addrList.length > 0) {
                    // fallback → select first address
                    setSelectedAddress(addrList[0].id);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    function handleChange(e: any) {
        const { name, value, type, checked } = e.target;
        setAddressForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    const handleDeleteAddress = async (addressId: string) => {
        try {
            const token = localStorage.getItem("token");

            await fetch(`/api/delivery-details/detail/${addressId}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            // update UI
            const updated = addresses.filter((addr) => addr.id !== addressId);
            setAddresses(updated);

            // fix selected address
            if (selectedAddress === addressId) {
                if (updated.length > 0) {
                    setSelectedAddress(updated[0].id);
                } else {
                    setSelectedAddress(null);
                }
            }

        } catch (err) {
            console.error("Delete error", err);
        }
    };

    const sortedAddresses = [...addresses].sort((a, b) => {
        if (a.isDefault === b.isDefault) return 0;
        return a.isDefault ? -1 : 1;
    });

    const visibleAddresses = showAllAddresses
        ? sortedAddresses
        : sortedAddresses.slice(0, 2);

    async function handleAddressSubmit() {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) return;

        try {
            const res = await fetch("/api/delivery-details/user", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(addressForm)
            });
            const data = await res.json();

            if (data.success) {
                setAddresses((prev) => [...prev, data.data]);
                setSelectedAddress(data.data.id);
                setOpenModal(false);
                setAddressForm({
                    name: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                    landmark: "",
                    isDefault: false
                });
            }
        } catch (error) {
            console.error("error", error);
        }
    }

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    async function handleProceedButton() {
        const token = localStorage.getItem("token")
        try {
            const loaded = await loadRazorpay();
            if (!loaded) return alert("Razorpay SDK failed to load");
            const res = await fetch('/api/order/create-order', {
                method: "POST",
                headers: {
                    "authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    deliveryDetailId: selectedAddress
                })
            })
            const order = await res.json();
            if (!order.success) {
                console.log(order.message)
            }
            console.log("orderrr", order)
            // Open Razorpay checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.data.amount,
                currency: order.data.currency,
                order_id: order.data.razorpayOrderId,
                //@ts-ignore
                handler: async (response) => {
                    const verifyRes = await fetch("/api/order/verify-payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(response),
                    });
                    const data = await verifyRes.json();
                    if (data.success) alert("Payment Successful!");
                    else alert("Payment Verification Failed");
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#3399cc" },
            };
            //@ts-ignore
            const rzp = new window.Razorpay(options);
            rzp.open();

            // router.push("/checkout/payment")
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }
    return (
        <>
            <Navbar />
            <div className="px-[6%] py-12 grid lg:grid-cols-3 gap-10">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-10">

                    {/* CART ITEMS */}
                    <div>
                        <h2 className="text-2xl font-medium mb-6">Your Cart</h2>

                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 border p-4 rounded-2xl">

                                    <Image
                                        src={item.Product.productGallery?.[0]}
                                        width={80}
                                        height={80}
                                        alt=""
                                        className="rounded-xl"
                                    />

                                    <div className="flex-1">
                                        <p className="font-medium">{item.Product.productName}</p>
                                        <p className="text-gray-500">Rs. {item.Product.price}</p>
                                    </div>

                                    <div className="flex items-center border rounded-full px-3">
                                        <span className="px-3">{item.quantity}</span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ADDRESS */}
                    <div>
                        <h2 className="text-2xl font-medium mb-6">Delivery Address</h2>

                        {/* Fixed container */}
                        <div className="border rounded-2xl p-4 h-[300px] flex flex-col">

                            {/* Address list (scrollable) */}
                            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                                {visibleAddresses.map((addr) => (
                                    <div
                                        key={addr.id}
                                        className={`border p-4 rounded-2xl flex justify-between items-start ${selectedAddress === addr.id ? "border-black bg-gray-50" : ""
                                            }`}
                                        onClick={() => setSelectedAddress(addr.id)}
                                    >
                                        <div className="flex gap-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedAddress === addr.id}
                                                onChange={() => setSelectedAddress(addr.id)}
                                                onClick={(e) => e.stopPropagation()}
                                            />

                                            <div>
                                                <p className="font-medium">
                                                    {addr.name}
                                                    {addr.isDefault && (
                                                        <span className="text-xs bg-black text-white px-2 py-1 rounded ml-2">
                                                            Default
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-sm text-gray-600">{addr.address}</p>
                                                <p className="text-sm">{addr.phone}</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteAddress(addr.id);
                                            }}
                                            className="text-red-500 text-sm hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom fixed section */}
                            <div className="pt-3 border-t mt-3 space-y-2">

                                {addresses.length > 2 && (
                                    <button
                                        onClick={() => setShowAllAddresses((prev) => !prev)}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {showAllAddresses ? "Show Less" : "Show More"}
                                    </button>
                                )}

                                <div
                                    onClick={() => setOpenModal(true)}
                                    className="border-dashed border-2 flex items-center justify-center rounded-xl cursor-pointer py-2"
                                >
                                    + Add New Address
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT */}
                <div className="border rounded-2xl p-6 h-fit sticky top-10">

                    <h2 className="text-xl font-medium mb-4">Order Summary</h2>

                    <div className="space-y-2 mb-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.Product.productName} x{item.quantity}</span>
                                <span>Rs. {item.Product.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <hr className="my-4" />

                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>Rs. {total}</span>
                    </div>

                    <div className="flex justify-between mb-4">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <div className="flex justify-between font-medium text-lg mb-6">
                        <span>Total</span>
                        <span>Rs. {total}</span>
                    </div>

                    <button onClick={handleProceedButton} className="w-full bg-black text-white py-3 rounded-full">
                        Proceed to Payment
                    </button>

                </div>
                {openModal && (
                    <div
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                        onClick={() => setOpenModal(false)}
                    >
                        <div
                            className="bg-white p-6 rounded-[28px] w-[420px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-medium mb-5">Add Delivery Address</h2>

                            {/* Name + Phone */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <input
                                    name="name"
                                    value={addressForm.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="border p-2 rounded-xl"
                                />
                                <input
                                    name="phone"
                                    value={addressForm.phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    className="border p-2 rounded-xl"
                                />
                            </div>

                            {/* Address */}
                            <input
                                name="address"
                                value={addressForm.address}
                                onChange={handleChange}
                                placeholder="Address"
                                className="border w-full mb-3 p-2 rounded-xl"
                            />

                            {/* City + State */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <input
                                    name="city"
                                    value={addressForm.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="border p-2 rounded-xl"
                                />
                                <input
                                    name="state"
                                    value={addressForm.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    className="border p-2 rounded-xl"
                                />
                            </div>

                            {/* Pincode */}
                            <input
                                name="pincode"
                                value={addressForm.pincode}
                                onChange={handleChange}
                                placeholder="Pincode"
                                className="border w-full mb-3 p-2 rounded-xl"
                            />

                            {/* Landmark */}
                            <input
                                name="landmark"
                                value={addressForm.landmark}
                                onChange={handleChange}
                                placeholder="Landmark (optional)"
                                className="border w-full mb-4 p-2 rounded-xl"
                            />

                            {/* Default Checkbox */}
                            <label className="flex items-center gap-2 mb-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={addressForm.isDefault}
                                    onChange={handleChange}
                                />
                                <span className="text-sm">Set as default address</span>
                            </label>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="px-4 py-2 border rounded-full"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleAddressSubmit}
                                    className="px-5 py-2 bg-black text-white rounded-full"
                                >
                                    Save Address
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}