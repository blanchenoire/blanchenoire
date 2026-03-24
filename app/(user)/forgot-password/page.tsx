"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const router = useRouter();
    const [step, setStep] = useState<"email" | "otp" | "password">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const response = await res.json();
            if (response.success) {
                setStep("otp");
            } else {
                setError(response.message);
            }
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError("");
        try {
            // just move to password step, OTP verified on final submit
            setStep("password");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword })
            });
            const response = await res.json();
            if (response.success) {
                router.push("/login");
            } else {
                setError(response.message);
                // if OTP invalid go back to OTP step
                if (response.message === "Invalid OTP" || response.message === "OTP expired") {
                    setStep("otp");
                }
            }
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
            <div className="bg-white rounded-[32px] shadow-lg p-10 w-full max-w-md">

                {/* Step indicator */}
                <div className="flex gap-2 mb-8">
                    {["email", "otp", "password"].map((s, i) => (
                        <div key={s} className={`h-1 flex-1 rounded-full ${step === s || ["email", "otp", "password"].indexOf(step) > i ? "bg-black" : "bg-gray-200"}`} />
                    ))}
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {/* Step 1 - Email */}
                {step === "email" && (
                    <>
                        <h2 className="text-2xl font-semibold mb-2">Forgot Password</h2>
                        <p className="text-gray-500 text-sm mb-6">Enter your email to receive an OTP</p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-full bg-[#f7f7f7] outline-none focus:ring-2 focus:ring-black mb-4"
                        />
                        <button
                            onClick={handleSendOtp}
                            disabled={!email || loading}
                            className="w-full bg-black text-white py-3 rounded-full disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </>
                )}

                {/* Step 2 - OTP */}
                {step === "otp" && (
                    <>
                        <h2 className="text-2xl font-semibold mb-2">Enter OTP</h2>
                        <p className="text-gray-500 text-sm mb-6">Check your email for the OTP</p>
                        <input
                            type="text"
                            maxLength={6}
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-4 py-3 rounded-full bg-[#f7f7f7] outline-none focus:ring-2 focus:ring-black text-center text-xl tracking-widest mb-4"
                        />
                        <button
                            onClick={handleVerifyOtp}
                            disabled={otp.length !== 6 || loading}
                            className="w-full bg-black text-white py-3 rounded-full disabled:opacity-50 mb-3"
                        >
                            Continue
                        </button>
                        <button
                            onClick={handleSendOtp}
                            className="w-full text-sm text-gray-500 hover:underline"
                        >
                            Resend OTP
                        </button>
                    </>
                )}

                {/* Step 3 - New Password */}
                {step === "password" && (
                    <>
                        <h2 className="text-2xl font-semibold mb-2">New Password</h2>
                        <p className="text-gray-500 text-sm mb-6">Enter your new password</p>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-full bg-[#f7f7f7] outline-none focus:ring-2 focus:ring-black mb-3"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-full bg-[#f7f7f7] outline-none focus:ring-2 focus:ring-black mb-4"
                        />
                        <button
                            onClick={handleResetPassword}
                            disabled={!newPassword || !confirmPassword || loading}
                            className="w-full bg-black text-white py-3 rounded-full disabled:opacity-50"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </>
                )}

                <button
                    onClick={() => router.push("/login")}
                    className="w-full text-sm text-gray-500 mt-4 hover:underline"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
}