"use client";

import Navbar from "@/app/components/Navbar";
import Image from "next/image";

export default function SubscriptionPage() {
  return (
    <div className="theme-page">

      {/* NAVBAR */}
      <Navbar />

      <main>

        {/* HERO */}
        <section className="grid items-center gap-12 px-4 pb-20 pt-36 sm:px-[6%] md:grid-cols-2 md:pb-32">

          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.32em] text-[#f0bf70]">
              Subscription
            </span>

            <h1 className="font-display mb-6 text-[48px] font-bold uppercase leading-tight text-white md:text-[96px]">
              Something <br /> is Brewing
            </h1>

            <p className="theme-muted mb-8 max-w-xl text-lg leading-8">
              We’re crafting a new way to experience coffee — curated,
              consistent, and deeply personal.
              <br /><br />
              Thoughtfully designed rituals are on their way.
            </p>

            <button
              onClick={() => document.getElementById("upcoming")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full bg-white px-6 py-3 font-bold text-[#102033] transition hover:-translate-y-0.5"
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
              className="glass-panel w-full max-w-[450px] rounded-[34px] p-3"
            />
          </div>

        </section>

        {/* BRAND MESSAGE */}
        <section className="px-4 sm:px-[6%] py-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Not Just Coffee.
          </h2>
          <p className="theme-muted text-lg leading-relaxed">
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
            <p className="theme-muted text-lg">
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
              <div key={i} className="theme-card overflow-hidden rounded-[28px]">

                <Image
                  src={item.img}
                  alt=""
                  width={400}
                  height={250}
                  className="w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="theme-muted mb-4 text-sm">{item.desc}</p>

                  <span className="text-xs uppercase tracking-wider text-[#f0bf70]">
                    Coming Soon
                  </span>
                </div>

              </div>
            ))}

          </div>

        </section>

        {/* EXPERIENCE */}
        <section className="border-y border-white/10 bg-white/[0.04] px-4 py-20 text-center sm:px-[6%]">

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Designed Around You
          </h2>

          <p className="theme-muted mx-auto mb-10 max-w-2xl text-lg">
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

          <p className="theme-muted mb-8">
            We’re almost ready. Something special is coming your way.
          </p>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-4 py-10 text-sm text-white/46 sm:px-[6%]">
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
