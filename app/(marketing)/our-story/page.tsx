"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OurStoryPage() {
  const router = useRouter();
  return (
    <div className="theme-page">

      {/* NAVBAR */}
      <Navbar />

      <main className="">

        {/* HERO */}
        <section className="grid grid-cols-1 items-center gap-12 px-4 pb-16 pt-36 sm:px-[6%] md:grid-cols-2 md:gap-20 md:pb-28">

          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.32em] text-[#f0bf70]">
              Manifesto No. 01
            </span>

            <h1 className="font-display mb-6 text-[48px] font-bold uppercase leading-[0.98] text-white md:text-[96px]">
              The Modern <br />
              <span className="italic text-[#f3d3a4]">Alchemist</span>
            </h1>

            <p className="theme-muted mb-6 max-w-[520px] text-base leading-relaxed md:mb-8 md:text-lg">
              Transforming the daily caffeine ritual into a premium experience.
              From sourcing to roasting, every detail is curated to elevate every sip.
            </p>

            <button onClick={()=>{router.push("/products")}} className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#102033] transition hover:-translate-y-0.5 md:text-base">
              Explore Collection
            </button>
          </div>

          <div className="flex justify-center">
            <Image
              src="/coffee1.png"
              alt="coffee"
              width={600}
              height={700}
              className="glass-panel w-full max-w-[500px] rounded-[34px] p-3 object-cover md:rounded-[42px]"
            />
          </div>

        </section>

        {/* STORY */}
        <section className="border-y border-white/10 bg-white/[0.04] px-4 py-16 sm:px-[6%] md:py-24">
          <div className="max-w-6xl mx-auto">

            <h2 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tight">
              From Soil to Soul
            </h2>

            <p className="theme-muted mb-12 max-w-2xl text-base leading-relaxed md:text-lg">
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
                  className="glass-panel mb-4 w-full rounded-[28px] p-2 object-cover"
                />
                <h3 className="font-extrabold text-xl md:text-2xl mb-2 tracking-tight">
                  The Harvest
                </h3>
                <p className="theme-muted text-sm leading-relaxed md:text-base">
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
                  className="glass-panel mb-4 w-full rounded-[28px] p-2 object-cover"
                />
                <h3 className="font-extrabold text-xl md:text-2xl mb-2 tracking-tight">
                  The Craft
                </h3>
                <p className="theme-muted text-sm leading-relaxed md:text-base">
                  Precision roasting unlocks complex flavor profiles,
                  bringing out depth, aroma, and balance.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* GRID SECTION */}
        <section className="py-16 md:py-24 px-4 sm:px-[6%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="theme-card rounded-[28px] p-6">
            <h3 className="text-xl md:text-2xl font-extrabold mb-4 tracking-tight">
              Global Vision
            </h3>
            <p className="theme-muted text-sm md:text-base">
              Premium coffee crafted for a global audience, accessible everywhere.
            </p>
          </div>

          <div className="glass-panel overflow-hidden rounded-[28px] p-2">
            <Image
              src="/coffee4.png"
              alt="community"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="theme-card rounded-[28px] p-6 text-white">
            <h3 className="text-xl md:text-2xl font-extrabold mb-4 tracking-tight">
              Energy Series
            </h3>
            <p className="text-sm text-white/64 md:text-base">
              High-performance blends designed for modern lifestyles.
            </p>
          </div>

        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 sm:px-[6%] mb-12">
          <div className="glass-panel mx-auto max-w-3xl rounded-[32px] p-6 text-center md:p-12">

            <h2 className="text-3xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Join the Movement
            </h2>

            <p className="theme-muted mb-6 text-base leading-relaxed md:text-lg">
              Get exclusive access to new drops, curated blends, and premium coffee experiences.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="theme-input mb-4 w-full rounded-full p-3 text-sm md:text-base"
            />

            <button className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#102033] transition hover:-translate-y-0.5 md:text-base">
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
