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
    <div className="theme-page flex">
      {/* LEFT SIDE */}
      <div className="glass-panel hidden w-1/2 flex-col justify-between rounded-r-[40px] p-12 md:flex">
        <div className="flex items-center">
          <img
            src="/final-logo.png"
            alt="logo"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </div>
        <div>
          <h1 className="font-display mb-6 text-5xl font-bold uppercase leading-tight text-white">
            Welcome to <br /> Coffee Elegance
          </h1>
          <p className="theme-muted max-w-md">
            Experience premium handcrafted coffee. Join our community of coffee lovers.
          </p>
        </div>
        <div className="text-sm text-white/46">© 2026 Blanche Noire</div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="glass-panel w-full max-w-md rounded-[32px] p-10 shadow-lg">

          {/* TOGGLE */}
          <div className="mb-8 flex rounded-full bg-white/8 p-1">
            <button
              onClick={() => { setIsLogin(true); setError(""); }}
              className={`w-1/2 rounded-full py-2 text-sm transition ${isLogin ? "bg-white text-[#102033]" : "text-white/58"}`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); }}
              className={`w-1/2 rounded-full py-2 text-sm transition ${!isLogin ? "bg-white text-[#102033]" : "text-white/58"}`}
            >
              Sign Up
            </button>
          </div>

          {/* TITLE */}
          <h2 className="mb-6 text-2xl font-semibold text-white">
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
                className="theme-input rounded-full px-4 py-3"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="theme-input rounded-full px-4 py-3"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="theme-input rounded-full px-4 py-3"
            />

            {isLogin && (
              <div className="flex justify-end mt-1">
                <button
                  onClick={() => router.push("/forgot-password")}
                  className="text-sm text-white/56 transition hover:text-white"
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
                  className="theme-input rounded-full px-4 py-3"
                />
                <input
                  type="tel"
                  name="contact"
                  placeholder="Phone Number"
                  value={form.contact}
                  onChange={handleChange}
                  className="theme-input rounded-full px-4 py-3"
                />
              </>
            )}

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 rounded-full bg-white py-3 font-bold text-[#102033] transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
            </button>
          </div>

          {/* FOOTER */}
          <p className="mt-6 text-center text-sm text-white/56">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="ml-2 font-medium text-white"
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
