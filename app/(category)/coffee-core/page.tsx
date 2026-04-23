"use client";

import Navbar from "@/app/components/Navbar";
import Image from "next/image";

export default function CoffeeCorePage() {
  return (
    <div className="bg-[#f5f3ef] text-[#1c1c1a]">

      <Navbar />

      <main>

        {/* HERO */}
        <section className="relative h-[90vh] flex items-center px-4 sm:px-[6%]">
          <Image
            src="/d.jpeg"
            alt="coffee beans"
            fill
            className="object-cover opacity-30"
          />

          <div className="relative z-10 max-w-2xl">
            <span className="text-sm tracking-[0.25em] uppercase text-gray-700 mb-4 block">
              The Alchemist’s Selection
            </span>

            <h1 className="text-[48px] md:text-[96px] font-bold leading-[0.9] mb-6">
              COFFEE <br />
              <span className="text-[#6b5e55] italic">CORE</span>
            </h1>

            <p className="text-gray-700 text-lg leading-relaxed">
              Elevating the daily grind into a curated ritual. From high-altitude
              single origins to modern liquid innovation, discover the foundation
              of the Blanche Noire experience.
            </p>
          </div>
        </section>

        {/* CLASSIC BLENDS */}
        <section className="px-4 sm:px-[6%] py-20">

          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Classic & Premium Blends
            </h2>
            <p className="text-gray-600 max-w-xl">
              The timeless pillars of our roastery. Engineered for consistency,
              depth, and the perfect morning start.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              {
                name: "Classic Filter",
                desc: "Bright acidity with notes of citrus and brown sugar.",
                img: "/plan1.png",
              },
              {
                name: "Strong South",
                desc: "Bold, earthy, and intense. Chicory-infused tradition.",
                img: "/plan2.png",
              },
              {
                name: "Smooth Instant",
                desc: "Freeze-dried at peak aroma. Convenience without compromise.",
                img: "/plan3.png",
              },
              {
                name: "Gold Premium",
                desc: "Velvet body with a dark chocolate finish.",
                img: "/plan1.png",
              },
            ].map((item, i) => (
              <div key={i}>
                <h1 className="flex justify-center tracking-wider text-gray-400 text-lg p-20">COMING SOON</h1>

                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.desc}</p>

                <span className="text-xs uppercase tracking-wider text-gray-400">
                  Coming Soon
                </span>
              </div>
            ))}

          </div>
        </section>

        {/* SPECIALTY */}
        <section className="px-4 sm:px-[6%] py-20">

          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Specialty & Single Origin
            </h2>
            <p className="text-gray-600 max-w-xl">
              Traceable to the estate. Each lot tells a story of its unique terroir.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* MAIN FEATURE */}
            <div className="bg-white p-6 rounded-xl col-span-2 grid md:grid-cols-2 gap-6 items-center">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#a66b4f]">
                  Limited Release
                </span>

                <h3 className="text-2xl font-bold mt-2 mb-3">
                  Coorg Reserve
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  Harvested at 3,500ft, this micro-lot features rare notes of wild honey and sandalwood.
                </p>

                <span className="text-xs text-gray-400 uppercase">
                  Coming Soon
                </span>
              </div>

              <Image
                src="/coorg.png"
                alt=""
                width={400}
                height={300}
                className="rounded-xl"
              />
            </div>

            {/* SIDE CARD */}
            <div className="bg-white p-6 rounded-xl">
              <Image
                src="/estate.png"
                alt=""
                width={300}
                height={200}
                className="rounded-xl mb-4"
              />

              <h3 className="text-xl font-bold">Chikmagalur Estate</h3>
              <p className="text-gray-600 text-sm mb-4">
                Clean, crisp, with a sweet caramel aroma.
              </p>

              <span className="text-xs text-gray-400 uppercase">
                Coming Soon
              </span>
            </div>

          </div>

          {/* EXTRA CARDS */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">

            <div className="bg-white p-6 rounded-xl flex items-center gap-6">
              <Image src="/arabica.png" alt="" width={100} height={100} className="rounded-md"/>
              <div>
                <h3 className="font-bold">Arabica 100%</h3>
                <p className="text-gray-600 text-sm">
                  Soft body with floral undertones.
                </p>
                <span className="text-xs text-gray-400">Coming Soon</span>
              </div>
            </div>

            <div className="bg-black text-white p-6 rounded-xl flex items-center gap-6">
              <Image src="/dark.png" alt="" width={100} height={100} className="rounded-md"/>
              <div>
                <h3 className="font-bold">Dark French</h3>
                <p className="text-gray-400 text-sm">
                  Smoky, bittersweet, and deeply bold.
                </p>
                <span className="text-xs text-gray-500">Coming Soon</span>
              </div>
            </div>

          </div>

        </section>

        {/* MODERN */}
        <section className="px-4 sm:px-[6%] py-20">

          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Modern Formats
            </h2>
            <p className="text-gray-600 max-w-xl">
              Cold, fast, or ready to pour. Designed for a high-pace lifestyle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title: "Cold Brew Sachets",
                desc: "Smooth, low-acid home extraction.",
                img: "/coldbrew.jpg",
              },
              {
                title: "Iced Coffee Mixes",
                desc: "Instant café-quality iced lattes.",
                img: "/iced.jpg",
              },
              {
                title: "RTD Bottles",
                desc: "Nitro-charged ready-to-drink coffee.",
                img: "/rtd.jpg",
              },
            ].map((item, i) => (
              <div key={i}>
                <h1 className="flex justify-center tracking-wider text-gray-400 text-lg p-20">COMING SOON</h1>

                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.desc}</p>

                <span className="text-xs uppercase text-gray-400">
                  Coming Soon
                </span>
              </div>
            ))}

          </div>
        </section>

      </main>

    </div>
  );
}