"use client";

import Navbar from "@/app/components/Navbar";
import Image from "next/image";

export default function SubscriptionPage() {
  return (
    <div className="bg-[#f5f3ef] text-[#1c1c1a]">

      {/* NAVBAR */}
      <Navbar />

      <main>

        {/* HERO */}
        <section className="px-4 sm:px-[6%] py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-4 block">
              Subscription
            </span>

            <h1 className="text-[42px] md:text-[88px] font-bold leading-tight mb-6">
              Something <br /> is Brewing
            </h1>

            <p className="text-gray-600 max-w-xl mb-8 text-lg">
              We’re crafting a new way to experience coffee — curated,
              consistent, and deeply personal.
              <br /><br />
              Thoughtfully designed rituals are on their way.
            </p>

            <button
              onClick={() => document.getElementById("upcoming")?.scrollIntoView({ behavior: "smooth" })}
              className="border px-6 py-3 rounded-full font-medium hover:bg-black hover:text-white transition"
            >
              View Upcoming Drops
            </button>
          </div>

          <div className="flex justify-center">
            <Image
              src="/sub1.png"
              alt="subscription"
              width={500}
              height={600}
              className="rounded-[30px] w-full max-w-[450px]"
            />
          </div>

        </section>

        {/* BRAND MESSAGE */}
        <section className="px-4 sm:px-[6%] py-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Not Just Coffee.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            This isn’t about subscriptions.
            It’s about building a daily ritual you look forward to.
            Every detail — from sourcing to delivery — is being reimagined.
          </p>
        </section>

        {/* UPCOMING */}
        <section id="upcoming" className="px-4 sm:px-[6%] py-20">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-6xl font-bold mb-4">
              Upcoming Rituals
            </h2>
            <p className="text-gray-600 text-lg">
              Launching soon. Carefully curated. Worth the wait.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title: "Daily Brew",
                desc: "Your everyday essential, redefined.",
                img: "/plan1.png",
              },
              {
                title: "Energy Ritual",
                desc: "A sharper, cleaner boost — when you need it most.",
                img: "/plan2.png",
              },
              {
                title: "Full Experience",
                desc: "The complete ritual. Nothing missing.",
                img: "/plan3.png",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden">

                <Image
                  src={item.img}
                  alt=""
                  width={400}
                  height={250}
                  className="w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>

                  <span className="text-xs uppercase tracking-wider text-gray-400">
                    Coming Soon
                  </span>
                </div>

              </div>
            ))}

          </div>

        </section>

        {/* EXPERIENCE */}
        <section className="px-4 sm:px-[6%] py-20 bg-[#ebe7df] text-center">

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Designed Around You
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-10">
            Flexible. Personal. Effortless.
            We’re building a system that adapts to your lifestyle —
            not the other way around.
          </p>

          <div className="flex justify-center gap-8 text-sm font-medium">
            <span>Flexible Deliveries</span>
            <span>Curated Quality</span>
            <span>No Commitments</span>
          </div>

        </section>

        {/* FINAL CTA */}
        <section className="px-4 sm:px-[6%] py-20 text-center">

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Stay Tuned
          </h2>

          <p className="text-gray-600 mb-8">
            We’re almost ready. Something special is coming your way.
          </p>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="py-10 px-4 sm:px-[6%] border-t text-sm text-gray-500">
        <div className="flex flex-col md:flex-row justify-between">
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