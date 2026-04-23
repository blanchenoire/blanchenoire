"use client";

import Navbar from "@/app/components/Navbar";
import Image from "next/image";

export default function SnackingPairingPage() {
  return (
    <div className="bg-[#f5f3ef] text-[#1c1c1a]">

      <Navbar />

      <main>

        {/* HERO */}
        <section className="px-4 sm:px-[6%] py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-4 block">
              The Alchemy of Flavor
            </span>

            <h1 className="text-[48px] md:text-[88px] font-bold leading-[0.9] mb-6">
              SNACKS <br /> & PAIRINGS
            </h1>

            <p className="text-gray-600 text-lg max-w-xl mb-8">
              High-protein, low-impact indulgence designed to elevate your caffeine
              ritual without the crash.
            </p>

            <div className="flex gap-6">
              <button className="bg-[#6b5e55] text-white px-6 py-3 rounded-lg">
                Explore the Menu
              </button>
              <button className="underline text-sm">
                View Bundles
              </button>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/snack-hero.png"
              alt=""
              width={600}
              height={500}
              className="rounded-[20px]"
            />

            <div className="absolute bottom-6 left-6 bg-white p-5 rounded-xl shadow-md max-w-xs">
              <h3 className="font-semibold mb-2">The Golden Ratio</h3>
              <p className="text-sm text-gray-600">
                15g protein perfectly complements a double-shot espresso.
              </p>
            </div>
          </div>

        </section>

        {/* PRODUCT GRID */}
        <section className="px-4 sm:px-[6%] py-16 grid md:grid-cols-3 gap-8">

          {/* BIG CARD */}
          <div className="bg-white rounded-xl overflow-hidden col-span-2 grid md:grid-cols-2">

            <div className="h-[300px] bg-[#ebe7df] flex items-center justify-center text-gray-400">
              Coming Soon
            </div>
-/
            <div className="p-6 flex flex-col justify-center">
              <span className="text-xs uppercase text-gray-400 mb-2">
                Best Seller
              </span>
              <h3 className="text-2xl font-bold mb-3">
                Protein Coffee Cookies
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Infused with our signature Noir roast and whey isolate.
              </p>
              <span className="text-xs text-gray-400 uppercase">
                Coming Soon
              </span>
            </div>

          </div>

          {/* SIDE CARD */}
          <div className="bg-white rounded-xl p-6">

            <div className="h-[200px] bg-[#ebe7df] rounded-xl flex items-center justify-center text-gray-400 mb-4">
              Coming Soon
            </div>

            <h3 className="text-xl font-bold">
              Dark Chocolate Berry Bites
            </h3>

            <p className="text-gray-600 text-sm mt-2 mb-3">
              70% cacao paired with freeze-dried açai.
            </p>

            <span className="text-xs text-gray-400 uppercase">
              Coming Soon
            </span>
          </div>

        </section>

        {/* SECOND ROW */}
        <section className="px-4 sm:px-[6%] py-10 grid md:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="bg-white p-6 rounded-xl">
            <div className="h-[200px] bg-[#ebe7df] rounded-xl flex items-center justify-center text-gray-400 mb-4">
              Coming Soon
            </div>

            <h3 className="font-bold">Clean Energy Bars</h3>
            <p className="text-gray-600 text-sm">
              Date-based energy with sea salt & MCT oil.
            </p>

            <span className="text-xs text-gray-400">Coming Soon</span>
          </div>

          {/* CENTER (HIGHLIGHT) */}
          <div className="bg-[#b02e1f] text-white p-8 rounded-xl flex flex-col justify-center">
            <span className="text-xs uppercase mb-2 opacity-80">
              Limited Edition
            </span>

            <h3 className="text-2xl font-bold mb-3">
              Energy Shot Truffles
            </h3>

            <p className="text-sm opacity-90 mb-4">
              A high-voltage core of pure espresso ganache.
            </p>

            <span className="text-xs opacity-70 uppercase">
              Coming Soon
            </span>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded-xl">
            <div className="h-[200px] bg-[#ebe7df] rounded-xl flex items-center justify-center text-gray-400 mb-4">
              Coming Soon
            </div>

            <h3 className="font-bold">Smoked Almond Clusters</h3>
            <p className="text-gray-600 text-sm">
              Slow-roasted with hickory and maple.
            </p>

            <span className="text-xs text-gray-400">Coming Soon</span>
          </div>

        </section>

        {/* CURATED PAIRS */}
        <section className="px-4 sm:px-[6%] py-20">

          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-3">
                The Curated Pairs
              </h2>
              <p className="text-gray-600 max-w-xl">
                Scientifically paired snacks with our roasts to elevate flavor profiles.
              </p>
            </div>

            <span className="underline text-sm cursor-pointer">
              View All Bundles
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              "The Midnight Alchemist",
              "The Sunrise Protocol",
              "Peak Performance Kit",
            ].map((title, i) => (
              <div key={i} className="bg-white p-6 rounded-xl">

                <div className="flex gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#ebe7df] rounded-lg flex items-center justify-center text-xs text-gray-400">
                    Soon
                  </div>
                  <div className="flex items-center text-xl">+</div>
                  <div className="w-16 h-16 bg-[#ebe7df] rounded-lg flex items-center justify-center text-xs text-gray-400">
                    Soon
                  </div>
                </div>

                <h3 className="font-bold mb-2">{title}</h3>

                <p className="text-gray-600 text-sm mb-3">
                  Curated pairing experience crafted by our alchemists.
                </p>

                <span className="text-xs text-gray-400 uppercase">
                  Coming Soon
                </span>

              </div>
            ))}

          </div>

        </section>

        {/* FINAL SECTION */}
        <section className="px-4 sm:px-[6%] py-20 bg-black text-white grid md:grid-cols-2 gap-12 items-center">

          <Image
            src="/snack-last.png"
            alt=""
            width={500}
            height={400}
            className="rounded-xl"
          />

          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Redefining the Break
            </h2>

            <p className="text-gray-300 mb-8">
              Snacks engineered with the same precision as our roasts.
              No refined sugars. No fillers. Just functional indulgence.
            </p>

            <div className="space-y-3 text-sm">
              <div>✓ 0g Added Sugar</div>
              <div>✓ Bioavailable Proteins</div>
              <div>✓ Compostable Packaging</div>
            </div>
          </div>

        </section>

      </main>

    </div>
  );
}