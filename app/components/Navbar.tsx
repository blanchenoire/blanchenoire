"use client";

import {
  ShoppingBag,
  User,
  LogOut,
  UserCircle,
  UserStar,
  Menu,
  X,
} from "lucide-react";
import { URL } from "../config";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CartDrawer from "./CartDrawer";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [cartOpen, setCartOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
    setUserId(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleCartOpen = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      const currentUrl = `${pathname}?${searchParams.toString()}`;
      router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
      return;
    }
    setCartOpen(true);
  };

  return (
    <>
      <div className="w-full flex justify-center pt-4 sm:pt-6">
        <div className="w-[95%] border-b-2 md:w-[92%] bg-red-550 rounded-full px-4 md:px-8 py-3 flex items-center justify-between">

          {/* LOGO */}
          <div onClick={() => router.push("/")} className="cursor-pointer flex ">
            {/* <img className="w-20 md:w-24" src="/final-logo.png" alt="logo" /> */}
            <img className="w- md:w-24" src="/a.png" alt="logo" />
          </div>

          {/* RIGHT SIDE (UNCHANGED STRUCTURE) */}
          <div className="flex items-center gap-4  font-medium text-xl md:gap-8 text-sm">

            {/* DESKTOP LINKS (same position as before) */}
            <div className="hidden md:flex items-center gap-8">
              <a href={`${URL}/products`} className="cursor-pointer">Shop</a>
              <a className="cursor-pointer">Contact</a>
              <a className="cursor-pointer">Categories</a>
            </div>

            {/* PROFILE */}
            {token ? (
              <div className="relative" ref={popupRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/10 transition"
                >
                  <User size={20} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-10 bg-white rounded-2xl shadow-xl border py-2 w-44 z-50">
                    <button
                      onClick={() => {
                        router.push(`/profile/${userId}`);
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      <UserCircle size={16} />
                      Profile
                    </button>

                    {role === "Admin" && (
                      <button
                        onClick={() => {
                          router.push("/admin/products");
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                      >
                        <UserStar size={16} />
                        Admin
                      </button>
                    )}

                    <div className="border-t mx-3 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <span
                onClick={() => router.push("/login")}
                className="hidden md:block cursor-pointer"
              >
                Log In
              </span>
            )}

            {/* CART */}
            <ShoppingBag
              onClick={handleCartOpen}
              size={20}
              className="cursor-pointer"
            />

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden mt-4 mx-4 bg-white rounded-2xl shadow-lg p-5 space-y-4">
          <a href={`${URL}/products`} className="block">Shop</a>
          <a className="block">Contact</a>

          {!token && (
            <button
              onClick={() => router.push("/login")}
              className="w-full text-left"
            >
              Log In
            </button>
          )}
        </div>
      )}

      <CartDrawer isOpen={cartOpen} setIsOpen={setCartOpen} />
    </>
  );
}