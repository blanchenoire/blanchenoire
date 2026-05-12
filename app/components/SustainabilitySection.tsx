"use client";

import { PlayCircle } from "lucide-react";
import Image from "next/image";

export default function SustainabilitySection() {
  return (
    <div className="relative mb-20 mt-8 overflow-hidden px-[2%] md:px-[3%]">
      <div className="glass-panel-dark relative overflow-hidden rounded-[3rem] border border-white/10 bg-secondary/30 backdrop-blur-[2px]">
        <div className="relative z-20 flex w-full overflow-hidden whitespace-nowrap border-b border-white/20 bg-accent/90 py-4 text-secondary backdrop-blur-md md:py-6">
          <div className="flex animate-[marquee_20s_linear_infinite] items-center gap-12 font-sans text-sm font-bold uppercase tracking-widest md:text-lg">
            <span>FOLLOW THE GOAT</span>
            <span>100% ORGANIC</span>
            <span>SUSTAINABLY SOURCED</span>
            <span>FOLLOW THE GOAT</span>
            <span>100% ORGANIC</span>
            <span>SUSTAINABLY SOURCED</span>
            <span>FOLLOW THE GOAT</span>
            <span>100% ORGANIC</span>
            <span>SUSTAINABLY SOURCED</span>
          </div>
        </div>

        <section className="relative flex w-full flex-col items-center gap-12 overflow-hidden px-4 py-24 md:flex-row md:px-12 md:py-32">
          <div className="pointer-events-none absolute left-1/4 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-primary/20 blur-[150px] mix-blend-screen"></div>

          <div className="relative z-10 w-full md:w-5/12">
            <div className="glass-panel rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px w-8 bg-accent"></div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent">Our Commitment</span>
              </div>

              <p className="mb-8 font-serif text-[32px] font-bold leading-[1.2] text-white md:text-[48px] md:leading-[1.1]">
                Purity & <span className="font-light italic text-accent">Planet.</span>
              </p>

              <p className="mb-8 font-sans font-light leading-relaxed text-white/70">
                Our coffee, our farmers, and our planet are the heart of our alchemy. Each cup reflects an unwavering commitment to sustainable sourcing and ethical roasting practices.
              </p>

              <button className="group flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:text-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 backdrop-blur-md transition-all group-hover:border-accent group-hover:bg-white/5">
                  <PlayCircle className="h-5 w-5" />
                </div>
                <span>Watch The Process</span>
              </button>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-7/12">
            <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div className="pointer-events-none absolute inset-0 z-10 bg-secondary/20 mix-blend-overlay"></div>
              <video
                className="h-full w-full object-cover transition-transform duration-[15s] group-hover:scale-105"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/v1774601461/WhatsApp_Video_2026-03-25_at_15.36.58_ei5btg.mp4`} type="video/mp4" />
              </video>

              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                <div className="glass-panel flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-black/40">
                  <Image src="/final-logo.png" alt="BN Logo" width={40} height={40} className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
