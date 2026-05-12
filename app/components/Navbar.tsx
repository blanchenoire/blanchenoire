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
  const [categories, setCategories] = useState<string[]>([]);

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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navItemClass = (href: string) =>
    `relative cursor-pointer rounded-full px-3 py-2 transition ${
      isActive(href)
        ? "text-primary"
        : "hover:text-primary"
    }`;

  const categoriesActive = [
    "/coffee-core",
    "/coffee-shots",
    "/snacking-pairing",
    "/coffee-equipments",
  ].some((href) => isActive(href));

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
      <div className="pointer-events-none fixed top-0 z-50 flex w-full justify-center px-4 pb-2 pt-6 transition-all duration-300 sm:pt-8">
        <div className="glass-panel pointer-events-auto relative flex w-[95%] items-center rounded-full px-6 py-3 text-[#162B45] shadow-lg md:w-[92%] md:px-8">

          {/* LOGO (LEFT) */}
          <div
            onClick={() => router.push("/")}
            className="cursor-pointer z-10"
          >
            <img
              className="h-10 object-contain transition-opacity hover:opacity-80 md:h-12"
              src="/final-logo.png"
              alt="logo"
            />
          </div>

          {/* CENTERED LINKS */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 text-sm font-medium uppercase tracking-widest text-black md:flex">

            <span onClick={() => router.push("/products")} className={navItemClass("/products")}>
              Shop
            </span>

            <span onClick={() => router.push("/subscription")} className={navItemClass("/subscription")}>
              Subscription
            </span>

            <span onClick={() => router.push("/our-story")} className={navItemClass("/our-story")}>
              Our Story
            </span>

            {/* CATEGORIES */}
            <div className="relative group">
              <span className={`relative cursor-pointer rounded-full px-3 py-2 transition ${categoriesActive ? "text-primary" : "hover:text-primary"}`}>Categories</span>

              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 hidden group-hover:flex flex-col items-center z-50">
                <div className="absolute -top-3 h-3 w-full bg-transparent"></div>

                <div className="glass-panel-dark flex min-w-[280px] flex-col items-center gap-6 rounded-[2rem] px-10 py-8 text-[#f7efe2] shadow-2xl">
                  {categories.map((category, i) => {
                    const normalize = (str: string) =>
                      str.toLowerCase().replace(/_/g, " ").trim();

                    const key = normalize(category);

                    return (
                      <div
                        key={i}
                        className="cursor-pointer text-center text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 hover:text-accent"
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

            <span onClick={() => { router.push("/contact") }} className={navItemClass("/contact")}>Contact</span>
          </div>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-4 text-sm font-medium text-black md:gap-8">

            {token ? (
              <div className="relative" ref={popupRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/10"
                >
                  <User size={20} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-10 z-50 w-44 rounded-2xl border bg-white py-2 text-black shadow-xl">
                    <button
                      onClick={() => {
                        router.push(`/profile/${userId}`);
                        setProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
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
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                      >
                        <UserStar size={16} />
                        Admin
                      </button>
                    )}

                    <div className="mx-3 my-1 border-t" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
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
                className="hidden cursor-pointer text-lg font-semibold transition hover:text-primary md:block"
              >
                Log In
              </span>
            )}

            <ShoppingBag
              onClick={handleCartOpen}
              size={20}
              className="cursor-pointer transition hover:text-primary"
            />

            <button
              className="rounded-full p-2 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="glass-panel-dark fixed left-4 right-4 top-24 z-50 space-y-6 rounded-3xl p-8 text-[#f7efe2] shadow-2xl md:hidden">
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
                  <div 
                    key={i} 
                    className="cursor-pointer text-sm tracking-[0.15em] uppercase text-[#f7efe2]/80 hover:text-accent transition-colors"
                  >
                    {formatCat(category)}
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
