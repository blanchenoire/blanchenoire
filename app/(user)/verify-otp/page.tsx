"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOtp() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        const userId = localStorage.getItem("userId");
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, otp })
            });

            const response = await res.json();

            if (response.success) {
                router.push("/checkout");
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
            <div className="bg-white rounded-[32px] shadow-lg p-10 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-2">Verify your email</h2>
                <p className="text-gray-500 text-sm mb-6">Enter the 6-digit OTP sent to your email</p>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 rounded-full bg-[#f7f7f7] outline-none focus:ring-2 focus:ring-black text-center text-xl tracking-widest mb-4"
                />

                <button
                    onClick={handleVerify}
                    disabled={otp.length !== 6 || loading}
                    className="w-full bg-black text-white py-3 rounded-full disabled:opacity-50"
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>
            </div>
        </div>
    );
}