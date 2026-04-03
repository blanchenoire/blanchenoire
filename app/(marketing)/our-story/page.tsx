"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";

export default function OurStoryPage() {
  return (
    <div className="bg-[#f5f3ef] text-[#1c1c1a]">

      {/* NAVBAR */}
      <Navbar />

      <main className="">

        {/* HERO */}
        <section className="px-4 sm:px-[6%] py-16 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-4 block font-semibold">
              Manifesto No. 01
            </span>

            <h1 className="text-[42px] leading-[44px] md:text-[90px] md:leading-[92px] mb-6 font-extrabold tracking-tight">
              The Modern <br />
              <span className="italic text-red-900">Alchemist</span>
            </h1>

            <p className="text-gray-600 max-w-[460px] mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
              Transforming the daily caffeine ritual into a premium experience.
              From sourcing to roasting, every detail is curated to elevate every sip.
            </p>

            <button className="bg-black text-white px-7 py-3 rounded-full text-sm md:text-base font-medium hover:scale-95 transition">
              Explore Collection
            </button>
          </div>

          <div className="flex justify-center">
            <Image
              src="/coffee1.png"
              alt="coffee"
              width={600}
              height={700}
              className="rounded-[30px] md:rounded-[40px] w-full max-w-[500px] object-cover"
            />
          </div>

        </section>

        {/* STORY */}
        <section className="bg-[#ebe7df] py-16 md:py-24 px-4 sm:px-[6%]">
          <div className="max-w-6xl mx-auto">

            <h2 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tight">
              From Soil to Soul
            </h2>

            <p className="text-gray-600 mb-12 max-w-2xl text-base md:text-lg leading-relaxed">
              Every bean is a journey. We source from high-altitude estates where
              climate and soil create depth, richness, and balance in every cup.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              <div>
                <Image
                  src="/coffee2.png"
                  alt="harvest"
                  width={500}
                  height={300}
                  className="rounded-xl mb-4 w-full object-cover"
                />
                <h3 className="font-extrabold text-xl md:text-2xl mb-2 tracking-tight">
                  The Harvest
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Hand-picked beans ensure premium quality and sustainability,
                  preserving the authenticity of every origin.
                </p>
              </div>

              <div>
                <Image
                  src="/coffee3.png"
                  alt="craft"
                  width={500}
                  height={300}
                  className="rounded-xl mb-4 w-full object-cover"
                />
                <h3 className="font-extrabold text-xl md:text-2xl mb-2 tracking-tight">
                  The Craft
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Precision roasting unlocks complex flavor profiles,
                  bringing out depth, aroma, and balance.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* GRID SECTION */}
        <section className="py-16 md:py-24 px-4 sm:px-[6%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-[#e5e2df] p-6 rounded-xl">
            <h3 className="text-xl md:text-2xl font-extrabold mb-4 tracking-tight">
              Global Vision
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Premium coffee crafted for a global audience, accessible everywhere.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden">
            <Image
              src="/coffee4.png"
              alt="community"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="bg-black text-white p-6 rounded-xl">
            <h3 className="text-xl md:text-2xl font-extrabold mb-4 tracking-tight">
              Energy Series
            </h3>
            <p className="text-sm md:text-base text-gray-300">
              High-performance blends designed for modern lifestyles.
            </p>
          </div>

        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 sm:px-[6%] mb-12">
          <div className="max-w-3xl mx-auto bg-[#e7e1d3] rounded-xl p-6 md:p-12 text-center">

            <h2 className="text-3xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Join the Movement
            </h2>

            <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
              Get exclusive access to new drops, curated blends, and premium coffee experiences.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-full mb-4 border text-sm md:text-base"
            />

            <button className="bg-black text-white px-6 py-3 rounded-full text-sm md:text-base font-medium hover:scale-95 transition">
              Subscribe
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer/>

    </div>
  );
}