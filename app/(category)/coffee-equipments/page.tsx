"use client";

import Navbar from "@/app/components/Navbar";
import Image from "next/image";

export default function EquipmentPage() {
    return (
        <div className="bg-[#f5f3ef] text-[#1c1c1a]">

            <Navbar />

            <main>

                {/* HERO */}
                <section className="px-4 sm:px-[6%] py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <span className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-4 block">
                            The Alchemist’s Kit
                        </span>

                        <h1 className="text-[48px] md:text-[88px] font-bold leading-[0.9] mb-6">
                            ELEVATE THE <br />
                            <span className="text-[#6b5e55]">DAILY RITUAL</span>
                        </h1>

                        <p className="text-gray-600 text-lg max-w-xl">
                            Beyond the bean, the alchemy of a perfect cup requires precision.
                            Our curated tools are designed to bridge technical mastery and
                            mindful mornings.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Image
                            src="/equipment-hero.png"
                            alt="coffee equipment"
                            width={400}
                            height={400}
                            className="rounded-2xl object-cover"
                        />
                    </div>

                </section>

                {/* FEATURE PRODUCT */}
                <section className="px-4 sm:px-[6%] py-16 grid md:grid-cols-3 gap-8 items-center">

                    <div className="col-span-1">
                        <div className="h-[300px] bg-[#ebe7df] rounded-xl flex items-center justify-center text-gray-400">
                            Coming Soon
                        </div>
                    </div>

                    <div className="col-span-1">
                        <span className="text-xs uppercase text-[#a66b4f] mb-2 block">
                            Limited Edition
                        </span>

                        <h2 className="text-3xl font-bold mb-4">
                            Home Brewing Starter Box
                        </h2>

                        <p className="text-gray-600 text-sm mb-6">
                            A complete alchemy kit featuring precision filters, curated beans,
                            and essential brewing tools to transform your space into a personal lab.
                        </p>

                        <span className="text-xs uppercase text-gray-400">
                            Coming Soon
                        </span>
                    </div>

                    <div className="col-span-1">
                        <div className="h-[300px] bg-[#ebe7df] rounded-xl flex items-center justify-center text-gray-400">
                            Coming Soon
                        </div>

                        <h3 className="mt-4 font-semibold">
                            Signature Mug
                        </h3>

                        <span className="text-xs text-gray-400">
                            Coming Soon
                        </span>
                    </div>

                </section>

                {/* PRODUCT GRID */}
                <section className="px-4 sm:px-[6%] py-10 grid md:grid-cols-3 gap-8">

                    {[
                        "French Press Kit",
                        "Thermal Tumbler",
                        "Precision Kettle",
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl">

                            <div className="h-[220px] bg-[#ebe7df] rounded-xl flex items-center justify-center text-gray-400 mb-4">
                                Coming Soon
                            </div>

                            <h3 className="font-semibold mb-2">{item}</h3>

                            <span className="text-xs text-gray-400 uppercase">
                                Coming Soon
                            </span>

                        </div>
                    ))}

                </section>

                {/* STORY SECTION */}
                <section className="px-4 sm:px-[6%] py-20 grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Designed for <br /> Intentional Living.
                        </h2>

                        <p className="text-gray-600 mb-8">
                            The tools you use should be as refined as the coffee you drink.
                            Every detail is crafted for balance, durability, and aesthetic harmony.
                        </p>

                        <div className="space-y-4 text-sm">
                            <div>
                                <strong>Sustainable Sourcing</strong>
                                <p className="text-gray-600">
                                    Built to last, reducing long-term waste.
                                </p>
                            </div>

                            <div>
                                <strong>Precision Engineering</strong>
                                <p className="text-gray-600">
                                    Designed for optimal extraction and control.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Image
                        src="/equipment-lifestyle.png"
                        alt="coffee lifestyle"
                        width={500}
                        height={500}
                        className="rounded-xl object-cover w-full h-[550px]"
                    />

                </section>

                {/* FOOTER */}
                <footer className="px-4 sm:px-[6%] py-10 border-t text-sm text-gray-500 flex flex-col md:flex-row justify-between">
                    <span>BLANCHE NOIRE</span>

                    <div className="flex gap-6">
                        <span>Sourcing</span>
                        <span>Brew Guides</span>
                        <span>Subscription</span>
                        <span>Privacy</span>
                    </div>

                    <span className="text-xs">
                        © 2026 Blanche Noire
                    </span>
                </footer>

            </main>

        </div>
    );
}