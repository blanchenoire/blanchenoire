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
import { useState, useRef, useEffect, Suspense } from "react";


function NavbarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [cartOpen, setCartOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const popupRef = useRef<HTMLDivElement>(null);

  const categoryRoutes: Record<string, string> = {
    "coffee core": "/coffee-core",
    "energy shots": "/coffee-shots",
    "snacks and pairings": "/snacking-pairing",
    "equipment": "/coffee-equipments",
  };


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

  useEffect(() => {
    async function getCategories() {
      const res = await fetch("/api/categories")
      const response = await res.json();
      setCategories(response.categories)
    }
    getCategories()
  }, [])

  const formatCat = (value: string) => {
    return value.replace(/_/g, " ");
  }

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
      {/* NAVBAR */}
      <div className="w-full flex justify-center pt-4 pb-2 sm:pt-6">
        <div className="relative z-50 w-[95%] bg-[#D8D4BC] md:w-[92%] rounded-full px-4 md:px-8 py-3 flex items-center">

          {/* LOGO (LEFT) */}
          <div
            onClick={() => router.push("/")}
            className="cursor-pointer z-10"
          >
            <img
              className="h-12 md:h-16 object-contain"
              src="/final-logo.png"
              alt="logo"
            />
          </div>

          {/* CENTERED LINKS */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 text-xl font-semibold items-center gap-8">

            <span onClick={() => router.push("/products")} className="cursor-pointer hover:scale-110 transition-transform duration-200">
              Shop
            </span>

            <span onClick={() => router.push("/subscription")} className="cursor-pointer hover:scale-110 transition-transform duration-200">
              Subscription
            </span>

            <span onClick={() => router.push("/our-story")} className="cursor-pointer hover:scale-110 transition-transform duration-200">
              Our Story
            </span>

            {/* CATEGORIES */}
            <div className="relative group">
              <span className="cursor-pointer hover:scale-110 transition-transform duration-200">Categories</span>

              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 hidden group-hover:flex flex-col items-center z-50">
                <div className="absolute -top-3 h-3 w-full bg-transparent"></div>

                <div className="bg-[#D8D4BC] rounded-xl shadow-lg px-8 py-6 flex flex-col items-center gap-4 min-w-[260px]">
                  {categories.map((category, i) => {
                    const normalize = (str: string) =>
                      str.toLowerCase().replace(/_/g, " ").trim();

                    const key = normalize(category);

                    return (
                      <div
                        key={i}
                        className="text-lg font-semibold tracking-wide hover:text-[#B8210F] hover:font-bold cursor-pointer hover:scale-105 text-center transition"
                        onClick={() => {
                          const route = categoryRoutes[key];
                          if (route) router.push(route);
                        }}
                      >
                        {formatCat(category)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <span onClick={() => { router.push("/contact") }} className="cursor-pointer hover:scale-110 transition-transform duration-200">Contact</span>
          </div>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-4 md:gap-8 text-sm font-medium">

            {token ? (
              <div className="relative" ref={popupRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/10"
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
                className="hidden md:block cursor-pointer text-lg font-semibold"
              >
                Log In
              </span>
            )}

            <ShoppingBag
              onClick={handleCartOpen}
              size={20}
              className="cursor-pointer"
            />

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN (UNCHANGED) */}
      {menuOpen && (
        <div className="md:hidden mt-4 mx-4 bg-white rounded-2xl shadow-lg p-5 space-y-4">
          <div onClick={() => router.push("/products")} className="cursor-pointer">Shop</div>
          <div onClick={() => router.push("/subscription")} className="cursor-pointer">Subscription</div>
          <div onClick={() => router.push("/our-story")} className="cursor-pointer">Our Story</div>

          <div>
            <div
              onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
              className="cursor-pointer font-medium"
            >
              Categories
            </div>

            {mobileCategoryOpen && (
              <div className="mt-3 space-y-3">
                {categories.map((category, i) => (
                  <div key={i} className="text-sm text-gray-700 cursor-pointer">
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="cursor-pointer" onClick={() => { router.push("/contact") }}>Contact</div>

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

export default function Navbar() {
  return (
    <Suspense fallback={<div className="w-full h-16" />}>
      <NavbarContent />
    </Suspense>
  );
}