"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BrewingGuides() {
  const router = useRouter();

  return (
    <section className="relative w-full overflow-hidden px-[4%] py-24 md:px-[6%] md:py-32 bg-secondary/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-accent"></div>
            <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent">Elevate Your Brew</span>
            <div className="h-px w-8 bg-accent"></div>
          </div>
          <h2 className="font-serif text-[36px] font-bold text-white md:text-[56px] leading-tight">
            THE ART OF <br />
            <span className="font-light italic text-accent">BREWING EXCELLENCE</span>
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-white/70 leading-relaxed md:text-lg">
            Master the perfect cup with our curated brewing techniques and premium equipment designed for coffee aficionados. Discover the right tools to extract every nuance of flavor from our signature blends.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1 */}
          <div className="glass-panel group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 md:p-12 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="relative z-10 flex h-full flex-col">
              <div className="relative mb-8 h-[320px] w-full flex items-center justify-center">
                <div className="absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[80px]"></div>
                <Image
                  src="/4_page-0001-removebg-preview.png"
                  alt="Brewing Method"
                  fill
                  className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2"
                />
              </div>
              <div className="mt-auto border-t border-white/10 pt-6">
                <h3 className="mb-3 font-serif text-2xl font-bold text-white">Precision & Control</h3>
                <p className="mb-6 font-sans text-sm leading-relaxed text-white/70">
                  Unlock the full potential of your beans with methods that offer precise control over temperature and extraction time. Designed for clarity and crisp flavor notes.
                </p>
                <button
                  onClick={() => router.push("/coffee-equipments")}
                  className="group/btn flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:text-accent"
                >
                  <span className="border-b border-white/30 pb-1 group-hover/btn:border-accent">Explore Gear</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 md:p-12 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="relative z-10 flex h-full flex-col">
              <div className="relative mb-8 h-[320px] w-full flex items-center justify-center">
                <div className="absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[80px]"></div>
                <Image
                  src="/5_page-0001-removebg-preview.png"
                  alt="Brewing Excellence"
                  fill
                  className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2"
                />
              </div>
              <div className="mt-auto border-t border-white/10 pt-6">
                <h3 className="mb-3 font-serif text-2xl font-bold text-white">Immersive Flavor</h3>
                <p className="mb-6 font-sans text-sm leading-relaxed text-white/70">
                  Experience a robust and full-bodied cup with immersion techniques that perfectly highlight our signature blends' rich and deeper taste profiles.
                </p>
                <button
                  onClick={() => router.push("/coffee-equipments")}
                  className="group/btn flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:text-accent"
                >
                  <span className="border-b border-white/30 pb-1 group-hover/btn:border-accent">Shop Methods</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
