"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";

interface Product {
    id: string;
    price: any;
    productName: string;
    description: string | null;
    category: string | null;
    stock: number;
    createdAt: Date;
    bestSeller: Boolean;
    productGallery: string[];
}

export default function AllProducts() {
    const [mobileFilter, setMobileFilter] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [browseFilter, setBrowseFilter] = useState<"all" | "bestSeller">("all");
    const [sortOrder, setSortOrder] = useState("recommended");
    const router = useRouter();

    async function getProds() {
        const res = await fetch(`/api/products`);
        const response = await res.json();
        const fetchedProducts: Product[] = response.data;
        setProducts(fetchedProducts);

        // extract unique categories from products
        const uniqueCategories = [
            ...new Set(
                fetchedProducts
                    .map((p) => p.category)
                    .filter(Boolean) as string[]
            ),
        ];
        setCategories(uniqueCategories);
    }

    useEffect(() => {
        getProds();
    }, []);

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
                <p className="uppercase text-sm mb-3">Browse By</p>
                <div className="border-b mb-4"></div>
                <ul className="space-y-3 text-sm">
                    <li
                        className={`cursor-pointer ${browseFilter === "all" ? "font-semibold underline" : ""}`}
                        onClick={() => setBrowseFilter("all")}
                    >
                        All Products
                    </li>
                    <li
                        className={`cursor-pointer ${browseFilter === "bestSeller" ? "font-semibold underline" : ""}`}
                        onClick={() => setBrowseFilter("bestSeller")}
                    >
                        Best Sellers
                    </li>
                </ul>
            </div>

            {/* Categories */}
            <div>
                <p className="uppercase text-sm mb-4">Filter By:</p>
                <div className="border-b mb-4"></div>
                <p className="text-sm mb-3 flex justify-between">
                    Categories <span>-</span>
                </p>
                <div className="space-y-2 text-sm">
                    {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="accent-black"
                                checked={selectedCategories.includes(cat)}
                                onChange={() => toggleCategory(cat)}
                            />
                            {cat}
                        </label>
                    ))}
                </div>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="px-[6%] py-16">

                {/* BREADCRUMB */}
                <p className="text-sm text-gray-500 mb-8">
                    Home &gt; <span className="text-black">All Products</span>
                </p>

                <div className="grid lg:grid-cols-[260px_1fr] gap-16">

                    {/* SIDEBAR */}
                    <aside className="hidden lg:block sticky top-32 h-fit">
                        <SidebarContent />
                    </aside>

                    {/* MAIN */}
                    <main>
                        <h1 className="text-[72px] leading-[1.05] mb-6">
                            {browseFilter === "bestSeller" ? "Best Sellers" : "All Products"}
                        </h1>

                        <p className="max-w-[650px] text-gray-600 mb-10 text-lg">
                            This is your category description. It's a great place to tell
                            customers what this category is about, connect with your audience
                            and draw attention to...
                            <span className="underline cursor-pointer ml-1">Read more</span>
                        </p>

                        {/* SORT + FILTER MOBILE */}
                        <div className="flex justify-between items-center mb-8">
                            <p className="text-sm">{filteredProducts.length} products</p>

                            <button
                                className="lg:hidden underline"
                                onClick={() => setMobileFilter(true)}
                            >
                                Filter & Sort
                            </button>

                            <select
                                className="hidden lg:block border px-3 py-2 rounded-md"
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
                            {filteredProducts.map((product: Product) => (
                                <div
                                    onClick={() => router.push(`/products/${product.id}`)}
                                    key={product.id}
                                    className="cursor-pointer"
                                >
                                    <div className="group relative overflow-hidden rounded-[36px] aspect-[4/5] w-full">
                                        <Image
                                            src={product.productGallery[0]}
                                            alt={product.productName}
                                            fill
                                            className="object-cover rounded-[36px] transition-opacity duration-500 group-hover:opacity-0"
                                        />
                                        {product.productGallery[1] && (
                                            <Image
                                                src={product.productGallery[1]}
                                                alt={product.productName}
                                                fill
                                                className="object-cover rounded-[36px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                            />
                                        )}
                                        {product.bestSeller && (
                                            <span className="absolute top-4 left-4 z-20 bg-[#DFF4C9] text-xs px-3 py-1 rounded-full">
                                                Best Seller
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-5 text-lg tracking-wide">{product.productName}</p>
                                    <p className="text-green-900 font-medium text-lg">
                                        ₹{product.price}.00
                                    </p>
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <p className="text-gray-400 text-center mt-20">No products found.</p>
                        )}
                    </main>
                </div>

                {/* MOBILE FILTER DRAWER */}
                {mobileFilter && (
                    <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl">Filter & Sort</h3>
                            <button onClick={() => setMobileFilter(false)}>✕</button>
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
                                className="border px-6 py-3 flex-1"
                                onClick={clearFilters}
                            >
                                Clear Filters
                            </button>
                            <button
                                className="bg-black text-white px-6 py-3 flex-1"
                                onClick={() => setMobileFilter(false)}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}