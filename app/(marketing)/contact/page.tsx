"use client";

import Navbar from "@/app/components/Navbar";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-[#f5f3ef] text-[#1c1c1a]">

      <Navbar />

      <main className="">

        {/* HERO */}
        <section className="px-4 sm:px-[6%] py-20 md:py-32 grid md:grid-cols-2 gap-16 items-center">

          <div>
            <span className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-5 block font-semibold">
              The Alchemy of Connection
            </span>

            <h1 className="text-[52px] leading-[52px] md:text-[96px] md:leading-[96px] font-extrabold tracking-tight mb-8">
              Connect <br /> with the <br /> Alchemist
            </h1>

            <p className="text-gray-600 max-w-[440px] text-lg leading-relaxed">
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
              className="rounded-[30px] shadow-2xl object-cover hover:scale-105 transition duration-500"
            />
          </div>

        </section>

        {/* CONTACT OPTIONS */}
        <section className="px-4 sm:px-[6%] py-20 md:py-28">

          <div className="grid md:grid-cols-3 gap-6">

            {/* EMAIL */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition cursor-pointer">
              <h3 className="text-2xl font-bold mb-3">Email Us</h3>
              <p className="text-gray-600 mb-4">
                For curated recommendations & support
              </p>
              <p className="font-medium underline">
                curator@blanchenoire.com
              </p>
            </div>

            {/* VISIT */}
            <div className="bg-black text-white p-8 rounded-2xl shadow-sm hover:scale-105 transition cursor-pointer">
              <h3 className="text-2xl font-bold mb-3">Visit Us</h3>
              <p className="text-gray-300 mb-4">
                Experience Blanche Noire physically
              </p>
              <p>
                422 Obsidian Plaza <br />
                Paris, France
              </p>
            </div>

            {/* SOCIAL */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition cursor-pointer">
              <h3 className="text-2xl font-bold mb-3">Connect</h3>
              <div className="space-y-2 text-gray-600">
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
            className="rounded-2xl shadow-md"
          />

          <div>
            <h2 className="text-3xl md:text-6xl font-extrabold mb-6">
              Crafted for <br /> Conversations
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Every interaction is treated with the same precision as our coffee.
              Thoughtful, intentional, and refined.
            </p>
          </div>

        </section>

        {/* B2B */}
        <section className="px-4 sm:px-[6%] py-20 md:py-28">

          <div className="border border-black/10 rounded-[40px] p-8 md:p-14 grid md:grid-cols-2 gap-12 items-center bg-white">

            <div>
              <span className="text-xs tracking-widest uppercase text-gray-500">
                B2B & Partnerships
              </span>

              <h2 className="text-4xl md:text-6xl font-extrabold mt-5 mb-6">
                Wholesale & <br /> Custom Rituals
              </h2>

              <p className="text-gray-600 mb-6 text-lg">
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
      <footer className="w-full py-10 px-4 sm:px-[6%] border-t text-sm text-gray-500">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <span>© 2026 Blanche Noire</span>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>

    </div>
  );
}