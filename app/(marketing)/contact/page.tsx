"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="theme-page">

      <Navbar />

      <main className="">

        {/* HERO */}
        <section className="grid items-center gap-16 px-4 pb-20 pt-36 sm:px-[6%] md:grid-cols-2 md:pb-32">

          <div>
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.35em] text-[#f0bf70]">
              The Alchemy of Connection
            </span>

            <h1 className="font-display mb-8 text-[54px] font-bold uppercase leading-[0.98] text-white md:text-[100px]">
              Connect <br /> with the <br /> Alchemist
            </h1>

            <p className="theme-muted max-w-[480px] text-lg leading-relaxed">
              Whether you seek the perfect roast or a refined coffee ritual,
              our curators are always within reach.
            </p>
          </div>

          <div className="flex justify-center">
            <Image
              src="/contact1.png"
              alt="coffee"
              width={500}
              height={500}
              className="glass-panel rounded-[34px] p-3 object-cover shadow-2xl transition duration-500 hover:scale-105"
            />
          </div>

        </section>

        {/* CONTACT OPTIONS */}
        <section className="px-4 sm:px-[6%] py-20 md:py-28">

          <div className="grid md:grid-cols-3 gap-6">

            {/* EMAIL */}
            <div className="theme-card cursor-pointer rounded-[28px] p-8 transition hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-3">Email Us</h3>
              <p className="theme-muted mb-4">
                For curated recommendations & support
              </p>
              <p className="font-medium underline">
                curator@blanchenoire.com
              </p>
            </div>

            {/* VISIT */}
            <div className="theme-card cursor-pointer rounded-[28px] p-8 text-white transition hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-3">Visit Us</h3>
              <p className="mb-4 text-white/64">
                Experience Blanche Noire physically
              </p>
              <p>
                422 Obsidian Plaza <br />
                Paris, France
              </p>
            </div>

            {/* SOCIAL */}
            <div className="theme-card cursor-pointer rounded-[28px] p-8 transition hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-3">Connect</h3>
              <div className="theme-muted space-y-2">
                <p className="hover:underline cursor-pointer">Instagram</p>
                <p className="hover:underline cursor-pointer">LinkedIn</p>
                <p className="hover:underline cursor-pointer">Spotify</p>
              </div>
            </div>

          </div>

        </section>

        {/* VISUAL SECTION */}
        <section className="px-4 sm:px-[6%] py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">

          <Image
            src="/contact2.png"
            alt=""
            width={500}
            height={400}
            className="glass-panel rounded-[28px] p-3 shadow-md"
          />

          <div>
            <h2 className="text-3xl md:text-6xl font-extrabold mb-6">
              Crafted for <br /> Conversations
            </h2>

            <p className="theme-muted text-lg leading-relaxed">
              Every interaction is treated with the same precision as our coffee.
              Thoughtful, intentional, and refined.
            </p>
          </div>

        </section>

        {/* B2B */}
        <section className="px-4 sm:px-[6%] py-20 md:py-28">

          <div className="glass-panel grid items-center gap-12 rounded-[40px] p-8 md:grid-cols-2 md:p-14">

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#f0bf70]">
                B2B & Partnerships
              </span>

              <h2 className="text-4xl md:text-6xl font-extrabold mt-5 mb-6">
                Wholesale & <br /> Custom Rituals
              </h2>

              <p className="theme-muted mb-6 text-lg">
                Elevate your workspace, boutique hotel, or café with Blanche Noire.
              </p>

              <button className="underline font-medium hover:tracking-wide transition">
                Download Partnership Dossier →
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <Image
                src="/contact3.png"
                alt=""
                width={200}
                height={200}
                className="rounded-xl hover:scale-105 transition"
              />

              <Image
                src="/contact4.png"
                alt=""
                width={200}
                height={200}
                className="rounded-xl hover:scale-105 transition"
              />

            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
