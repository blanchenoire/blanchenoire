"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    setError("");

    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password })
        });

        const response = await res.json();

        if (response.success) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("userId", response.userId);
          localStorage.setItem("role", response.role);
          const redirect = searchParams.get("redirect") || "/";
          router.push(redirect);
        } else {
          setError(response.message);
        }

      } else {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            username: form.username,
            contact: form.contact
          })
        });

        const response = await res.json();

        if (response.success) {
          setIsLogin(true);
          setError("");
          setForm({ username: "", email: "", password: "", confirmPassword: "", contact: "" });
        } else {
          setError(response.message);
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-[#e7e1d3] flex-col justify-between p-12 rounded-r-[40px]">
        <div className="flex items-center">
          <img
            src="/final-logo.png"
            alt="logo"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </div>
        <div>
          <h1 className="text-5xl font-semibold leading-tight mb-6">
            Welcome to <br /> Coffee Elegance
          </h1>
          <p className="text-gray-600 max-w-md">
            Experience premium handcrafted coffee. Join our community of coffee lovers.
          </p>
        </div>
        <div className="text-sm text-gray-500">© 2026 Blanche Noire</div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-[32px] shadow-lg p-10">

          {/* TOGGLE */}
          <div className="flex bg-[#f2f2f2] rounded-full p-1 mb-8">
            <button
              onClick={() => { setIsLogin(true); setError(""); }}
              className={`w-1/2 py-2 rounded-full text-sm transition ${isLogin ? "bg-black text-white" : "text-gray-500"}`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); }}
              className={`w-1/2 py-2 rounded-full text-sm transition ${!isLogin ? "bg-black text-white" : "text-gray-500"}`}
            >
              Sign Up
            </button>
          </div>

          {/* TITLE */}
          <h2 className="text-2xl font-semibold mb-6">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-4 px-2">{error}</p>
          )}

          {/* FORM */}
          <div className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={form.username}
                onChange={handleChange}
                className="px-4 py-3 rounded-full bg-[#f7f7f7] outline-none focus:ring-2 focus:ring-black"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="px-4 py-3 rounded-full bg-[#f7f7f7] outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="px-4 py-3 rounded-full bg-[#f7f7f7] outline-none focus:ring-2 focus:ring-black"
            />

            {isLogin && (
              <div className="flex justify-end mt-1">
                <button
                  onClick={() => router.push("/forgot-password")}
                  className="text-sm text-gray-500 hover:text-black transition"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {!isLogin && (
              <>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-full bg-[#f7f7f7] outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="tel"
                  name="contact"
                  placeholder="Phone Number"
                  value={form.contact}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-full bg-[#f7f7f7] outline-none focus:ring-2 focus:ring-black"
                />
              </>
            )}

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 bg-black text-white py-3 rounded-full hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
            </button>
          </div>

          {/* FOOTER */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="ml-2 text-black font-medium"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}