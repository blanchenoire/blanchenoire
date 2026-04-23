"use client";

import Navbar from "@/app/components/Navbar";
import Image from "next/image";

export default function CoffeeShotsPage() {
  return (
    <div className="bg-[#f5f3ef] text-[#1c1c1a]">

      <Navbar />

      <main>

        {/* HERO */}
        <section className="px-4 sm:px-[6%] py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-[#a66b4f] mb-4 block">
              The Innovation Range
            </span>

            <h1 className="text-[48px] md:text-[88px] font-bold leading-[0.9] mb-6">
              ALCHEMIST <br />
              <span className="text-[#6b5e55]">ENERGY.</span>
            </h1>

            <p className="text-gray-600 max-w-xl text-lg mb-8">
              Precision-engineered coffee shots infused with raw botanical extracts.
              No jitters. Just pure, clean performance for the modern pioneer.
            </p>

            <div className="flex gap-6">
              <button className="bg-[#6b5e55] text-white px-6 py-3 rounded-lg">
                View Collection
              </button>
              <button className="underline text-sm">
                The Science
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/energy.png"
              alt=""
              width={450}
              height={600}
              className="rounded-[30px]"
            />
          </div>

        </section>

        {/* PRECISION SHOTS */}
        <section className="px-4 sm:px-[6%] py-16">

          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Precision Shots
            </h2>
            <p className="text-gray-600 max-w-xl">
              Engineered for the impulse. High-bioavailability caffeine paired
              with nature’s most potent infusions.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              {
                name: "Strawberry Boost",
                tag: "Energy + Antiox",
                desc: "Cold-press espresso with wild strawberry extract.",
              },
              {
                name: "Blueberry Charge",
                tag: "Focus + Clarity",
                desc: "Brain-boosting blueberries meet pure extract.",
              },
              {
                name: "Citrus Focus",
                tag: "Immunity + Zest",
                desc: "Blood orange & yuzu fused with dark roast.",
              },
              {
                name: "Mocha Power",
                tag: "Strength + Endurance",
                desc: "Dark cacao infusion with sustained energy.",
              },
            ].map((item, i) => (
              <div key={i}>

                {/* IMAGE REPLACED */}
                <div className="h-[260px] bg-[#ebe7df] uppercase rounded-xl flex items-center justify-center text-sm text-gray-500 mb-4">
                  Coming Soon
                </div>

                <span className="text-xs uppercase tracking-wider text-[#a66b4f]">
                  {item.tag}
                </span>

                <h3 className="text-lg font-semibold mt-1 mb-2">
                  {item.name}
                </h3>

                <p className="text-gray-600 text-sm mb-2">
                  {item.desc}
                </p>

                <span className="text-xs uppercase text-gray-500">
                  Coming Soon
                </span>

              </div>
            ))}

          </div>

        </section>

        {/* SCIENCE SECTION */}
        <section className="px-4 sm:px-[6%] py-20 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT GRID */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#ebe7df] h-[150px] rounded-xl uppercase flex items-center justify-center text-gray-500">
              Coming Soon
            </div>

            <Image
              src="/beans.png"
              alt=""
              width={200}
              height={200}
              className="rounded-xl"
            />

            <Image
              src="/lab.png"
              alt=""
              width={200}
              height={200}
              className="rounded-xl"
            />

            <div className="bg-[#e8dcd5] h-[150px] rounded-xl flex items-center justify-center text-[#a66b4f] text-xl">
              ⚡
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Modern Alchemy:
              <br /> The Science of Infusion.
            </h2>

            <div className="space-y-6">

              <div>
                <span className="text-sm text-gray-400">01</span>
                <h3 className="font-semibold">Molecular Bonding</h3>
                <p className="text-gray-600 text-sm">
                  Flavor molecules bond directly to caffeine crystals for
                  immediate bioavailability.
                </p>
              </div>

              <div>
                <span className="text-sm text-gray-400">02</span>
                <h3 className="font-semibold">Raw Botanicals</h3>
                <p className="text-gray-600 text-sm">
                  No artificial syrups. Only cold-distilled extracts.
                </p>
              </div>

              <div>
                <span className="text-sm text-gray-400">03</span>
                <h3 className="font-semibold">Linear Energy Curve</h3>
                <p className="text-gray-600 text-sm">
                  Sustained 4-hour energy without crashes.
                </p>
              </div>

            </div>
          </div>

        </section>

      </main>

    </div>
  );
}