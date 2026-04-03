"use client";

import Navbar from "@/app/components/Navbar";
import Image from "next/image";

export default function SubscriptionPage() {
  return (
    <div className="bg-[#f5f3ef] text-[#1c1c1a]">

      {/* NAVBAR */}
      <Navbar />

      <main className="">

        {/* HERO */}
        <section className="px-4 sm:px-[6%] py-16 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4 block">
              Subscription Hub
            </span>

            <h1 className="text-[42px] leading-[44px] md:text-[88px] md:leading-[90px] font-bold tracking-tight mb-6">
              Your Daily Habit <br /> Redefined
            </h1>

            <p className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed mb-8">
              Curated monthly coffee rituals delivered to your door.
              No compromises. Just consistency, quality, and energy.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-full font-medium">
                Choose Plan
              </button>
              <button className="border px-6 py-3 rounded-full font-medium">
                How it works
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/sub1.png"
              alt="subscription"
              width={500}
              height={600}
              className="rounded-[30px] md:rounded-[40px] w-full max-w-[450px] object-cover"
            />
          </div>

        </section>

        {/* BENEFITS */}
        <section className="px-4 sm:px-[6%] py-16 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Free Shipping
            </h3>
            <p className="text-gray-600 text-sm">
              Delivered every month without extra cost.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              20% Savings
            </h3>
            <p className="text-gray-600 text-sm">
              Always save more as a subscriber.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Early Access
            </h3>
            <p className="text-gray-600 text-sm">
              Get exclusive drops before everyone else.
            </p>
          </div>

        </section>

        {/* PLANS */}
        <section className="px-4 sm:px-[6%] py-16 md:py-24">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4">
              Curated Rituals
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Choose your perfect plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* PLAN 1 */}
            <div className="bg-white p-6 rounded-xl text-center">
              <Image src="/plan1.png" alt="" width={400} height={200} className="rounded-xl mb-4"/>
              <h3 className="text-2xl font-bold mb-2">Daily Brew</h3>
              <p className="text-gray-600 text-sm mb-4">2 coffee bags monthly</p>
              <p className="text-3xl font-bold mb-6">₹999/mo</p>
              <button className="w-full bg-black text-white py-3 rounded-full">
                Subscribe
              </button>
            </div>

            {/* PLAN 2 */}
            <div className="bg-black text-white p-6 rounded-xl text-center md:scale-105">
              <Image src="/plan2.png" alt="" width={400} height={200} className="rounded-xl mb-4"/>
              <h3 className="text-2xl font-bold mb-2">Energy Charge</h3>
              <p className="text-gray-300 text-sm mb-4">Energy shots pack</p>
              <p className="text-3xl font-bold mb-6">₹1499/mo</p>
              <button className="w-full bg-white text-black py-3 rounded-full">
                Subscribe
              </button>
            </div>

            {/* PLAN 3 */}
            <div className="bg-white p-6 rounded-xl text-center">
              <Image src="/plan3.png" alt="" width={400} height={200} className="rounded-xl mb-4"/>
              <h3 className="text-2xl font-bold mb-2">Full Ritual</h3>
              <p className="text-gray-600 text-sm mb-4">All-in-one bundle</p>
              <p className="text-3xl font-bold mb-6">₹2499/mo</p>
              <button className="w-full bg-black text-white py-3 rounded-full">
                Subscribe
              </button>
            </div>

          </div>
        </section>

        {/* CONTROL SECTION */}
        <section className="px-4 sm:px-[6%] py-16 md:py-24 text-center bg-[#ebe7df]">

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Full Control, Always
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto mb-8 text-base md:text-lg">
            Pause, swap, or cancel anytime. Your subscription adapts to your lifestyle.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <span>Pause Anytime</span>
            <span>Swap Flavors</span>
            <span>No Contracts</span>
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full py-10 px-4 sm:px-[6%] border-t text-sm text-gray-500">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <span>© 2026 Blanche Noire</span>
          <div className="flex gap-4">
            <span className="cursor-pointer">Privacy</span>
            <span className="cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>

    </div>
  );
}