"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/app/components/Footer";
import { Loader } from "lucide-react";

interface Product {
    id: string;
    price: number;
    productName: string;
    description: string | null;
    category: string | null;
    stock: number;
    createdAt: Date;
    bestSeller: Boolean;
    productGallery: string[];
}

function AllProducts() {
    const [mobileFilter, setMobileFilter] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [browseFilter, setBrowseFilter] = useState<"all" | "bestSeller">("all");
    const [sortOrder, setSortOrder] = useState("recommended");
    const [loading, setLoading] = useState<Boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    async function getProds() {
        setLoading(true);
        const res = await fetch(`/api/products`);
        const response = await res.json();
        setLoading(false)
        const fetchedProducts: Product[] = response.data;
        setProducts(fetchedProducts);

        // extract unique categories from products
        // const uniqueCategories = [
        //     ...new Set(
        //         fetchedProducts
        //             .map((p) => p.category)
        //             .filter(Boolean) as string[]
        //     ),
        // ];
        // setCategories(uniqueCategories);

        const categoriesRes = await fetch("/api/categories");
        const categoriesResponse = await categoriesRes.json();
        const uniqueCategories = categoriesResponse.categories
        setCategories(uniqueCategories);
    }

    useEffect(() => {
        getProds();
    }, []);

    useEffect(() => {
        const categoryParam = searchParams.get("category");
        if (categoryParam) {
            setSelectedCategories([categoryParam]);
        }
    }, [searchParams]);

    const toggleCategory = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setBrowseFilter("all");
        setSortOrder("recommended");
    };

    const formatCategory = (value: string) => {
        return value.replace(/_/g, " ");
    }
    const filteredProducts = products
        .filter((p) => {
            if (browseFilter === "bestSeller") return p.bestSeller;
            return true;
        })
        .filter((p) => {
            if (selectedCategories.length === 0) return true;
            return p.category && selectedCategories.includes(p.category);
        })
        .sort((a, b) => {
            if (sortOrder === "priceLow") return a.price - b.price;
            if (sortOrder === "priceHigh") return b.price - a.price;
            if (sortOrder === "newest")
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            return 0;
        });

    const SidebarContent = () => (
        <>
            {/* Browse */}
            <div className="mb-10">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#f0bf70]">Browse By</p>
                <div className="mb-4 border-b border-white/12"></div>
                <ul className="space-y-3 text-sm text-white/66">
                    <li
                        className={`cursor-pointer ${browseFilter === "all" ? "font-semibold text-white underline" : ""}`}
                        onClick={() => setBrowseFilter("all")}
                    >
                        All Products
                    </li>
                    <li
                        className={`cursor-pointer ${browseFilter === "bestSeller" ? "font-semibold text-white underline" : ""}`}
                        onClick={() => setBrowseFilter("bestSeller")}
                    >
                        Best Sellers
                    </li>
                </ul>
            </div>

            {/* Categories */}
            <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f0bf70]">Filter By:</p>
                <div className="mb-4 border-b border-white/12"></div>
                <p className="mb-3 flex justify-between text-sm text-white/80">
                    Categories <span>-</span>
                </p>
                <div className="space-y-2 text-sm text-white/66">
                    {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="accent-[#d6a65a]"
                                checked={selectedCategories.includes(cat)}
                                onChange={() => toggleCategory(cat)}
                            />
                            {formatCategory(cat)}
                        </label>
                    ))}
                </div>
            </div>
        </>
    );

    return (
        <div className="theme-page">
            <Navbar />
            <div className="px-[6%] pb-16 pt-36 text-[#f8efe5]">

                {/* BREADCRUMB */}
                <p className="mb-8 text-sm text-white/48 animate-fade-in">
                    Home &gt; <span className="text-white">All Products</span>
                </p>

                <div className="grid lg:grid-cols-[260px_1fr] gap-16">

                    {/* SIDEBAR */}
                    <aside className="glass-panel-dark sticky top-32 hidden h-fit rounded-[2rem] border border-white/10 p-7 lg:block">
                        <SidebarContent />
                    </aside>

                    {/* MAIN */}
                    <main>
                        <h1 className="font-serif mb-6 text-[54px] font-bold uppercase leading-[1.02] text-white md:text-[82px]">
                            {browseFilter === "bestSeller" ? "Best Sellers" : "All Products"}
                        </h1>

                        <p className="mb-10 max-w-[650px] text-lg leading-8 text-white/62">
                            Browse signature roasts, ritual-ready tumblers, and polished coffee essentials from Blanche Noire.
                        </p>

                        {/* SORT + FILTER MOBILE */}
                        <div className="flex justify-between items-center mb-8">
                            <p className="text-sm text-white/58">{filteredProducts.length} products</p>

                            <button
                                className="lg:hidden underline"
                                onClick={() => setMobileFilter(true)}
                            >
                                Filter & Sort
                            </button>

                            <select
                                className="glass-button hidden rounded-full px-4 py-3 text-white outline-none lg:block"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="recommended">Recommended</option>
                                <option value="newest">Newest</option>
                                <option value="priceLow">Price (low to high)</option>
                                <option value="priceHigh">Price (high to low)</option>
                            </select>
                        </div>

                        {/* PRODUCT GRID */}
                        <div className="grid md:grid-cols-2 gap-12">
                            
                            {loading? <Loader/> :filteredProducts.map((product: Product) => (
                                <div
                                    onClick={() => router.push(`/products/${product.id}`)}
                                    key={product.id}
                                    className="cursor-pointer"
                                >
                                    <div className="glass-panel-dark group relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 p-3 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/30">
                                        <Image
                                            src={product.productGallery[0]}
                                            alt={product.productName}
                                            fill
                                            className="object-cover p-3 transition-opacity duration-500 group-hover:opacity-0"
                                        />
                                        {product.productGallery[1] && (
                                            <Image
                                                src={product.productGallery[1]}
                                                alt={product.productName}
                                                fill
                                                className="object-cover p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                            />
                                        )}
                                        {product.bestSeller && (
                                            <span className="absolute left-5 top-5 z-20 rounded-full border border-white/15 bg-white/14 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#f0bf70]">
                                                Best Seller
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-5 text-lg font-semibold tracking-wide text-white">{product.productName}</p>
                                    <p className="text-lg font-medium text-[#f0bf70]">
                                        ₹{product.price}.00
                                    </p>
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <p className="mt-20 text-center text-white/44">No products found.</p>
                        )}
                    </main>
                </div>

                {/* MOBILE FILTER DRAWER */}
                {mobileFilter && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050607] p-6 text-[#f8efe5]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl">Filter & Sort</h3>
                            <button onClick={() => setMobileFilter(false)}>x</button>
                        </div>

                        <p className="text-sm mb-4">({filteredProducts.length} products)</p>

                        <div className="mb-6">
                            <p className="mb-3 font-medium">Sort by:</p>
                            <div className="space-y-2">
                                {[
                                    { value: "recommended", label: "Recommended" },
                                    { value: "newest", label: "Newest" },
                                    { value: "priceLow", label: "Price (low to high)" },
                                    { value: "priceHigh", label: "Price (high to low)" },
                                ].map((opt) => (
                                    <label key={opt.value} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="sort"
                                            checked={sortOrder === opt.value}
                                            onChange={() => setSortOrder(opt.value)}
                                        />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <SidebarContent />
                        </div>

                        <div className="border-t pt-6 flex gap-4">
                            <button
                                className="glass-button flex-1 rounded-full px-6 py-3"
                                onClick={clearFilters}
                            >
                                Clear Filters
                            </button>
                            <button
                                className="flex-1 rounded-full bg-white px-6 py-3 text-[#102033]"
                                onClick={() => setMobileFilter(false)}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default function Products() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AllProducts />
        </Suspense>
    )
}
